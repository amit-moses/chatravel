import { useEffect, useState } from "react";
import { db, getCurrentUser } from "./firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/chatbox/Chat";
import UserLog from "./components/user/UserLog";
import Setting from "./components/user/Setting";
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
        // where("date1", "<=", currentUser.date2),
        // where("date2", ">=", currentUser.date1),
        orderBy("time")
      );

      function check_in(mydoc) {
        if (
          mydoc.date1 >= currentUser.date1 &&
          mydoc.date2 <= currentUser.date2
        ) {
          return true;
        } else if (
          mydoc.date1 <= currentUser.date1 &&
          mydoc.date2 <= currentUser.date2
        ) {
          return true;
        } else if (
          mydoc.date1 < currentUser.date2 &&
          mydoc.date2 > currentUser.date2
        ) {
          return true;
        } else {
          return false;
        }
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={currentUser? <Chat my_messages={msgData} userdata={currentUser} refi={refi} setuser={setUser} />: <UserLog refi={refi} user={currentUser} />} />
        <Route path="/chat" element={<Setting userdata={currentUser}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
