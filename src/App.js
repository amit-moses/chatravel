import { useEffect, useState } from "react";
import { db, getCurrentUser, logout } from "./firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/chatbox/Chat";
import Register from "./components/user/Register";
import Login from "./components/user/Login";

function App() {
  const [currentUser, setUser] = useState(false);
  const [msgData, setMsgData] = useState([]);
  const [refresh, setrefresh] = useState(0);

  useEffect(() => {
    async function get_user() {
      const MY_USER = await getCurrentUser();
      setUser(MY_USER);
      console.log(MY_USER);
    }
    get_user();
  }, [refresh]);

  useEffect(() => {
    if (currentUser) {
      const msgQuery = query(
        collection(db, "messages"),
        where("destination", "==", currentUser.destination),
        // where("date1", "<", currentUser.date1 - 1209600000),
        orderBy("time")
      );

      function check_in(mydoc) {
        if(mydoc.date1 >= currentUser.date1 && mydoc.date2 <= currentUser.date2){return true;}
        else if(mydoc.date1 <= currentUser.date1 && mydoc.date2 <= currentUser.date2){return true;}
        else if (mydoc.date1 < currentUser.date2 && mydoc.date2 > currentUser.date2){return true;}
        else{return false;}
      }

      const unsubscribe = onSnapshot(msgQuery, (snapshot) => {
        const newData = [];
        snapshot.docs.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };
          if (check_in(data)) {
            newData.push(data);
          }
        });
        setMsgData(newData);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  function refi() {
    const newref = refresh + 1;
    setrefresh(newref);
  }

  function sign_out() {
    logout().then((res) => {
      if (res) {
        refi();
      }
    });
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {currentUser ? (
                <>
                  <h1>{currentUser.name}</h1>
                  <button onClick={() => sign_out()}>logout</button>
                </>
              ) : (
                ""
              )}
              {msgData.map((msg) => (
                <h4 key={msg.id}>{msg.message}</h4>
              ))}
            </div>
          }
        />
        <Route
          path="/chat"
          element={<Chat my_messages={msgData} userdata={currentUser} />}
        />
        <Route path="/reg" element={<Register />} />
        <Route path="/log" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
