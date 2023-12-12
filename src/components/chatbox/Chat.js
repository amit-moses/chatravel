import NavbarChat from "./NavbarChat";
import TypeMessage from "./TypeMessage";
import "./chat.css";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { db, logout } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function Chat({ userdata, my_messages, refi, setuser }) {
  const [allUsers, setUsers] = useState([]);
  useEffect(() => {
    if (userdata) {
      async function getData() {
        const usersQuery = query(
          collection(db, "users"),
          where("destination", "==", userdata.destination),
          where("date1", ">", userdata.date1 - 1209600000)
          // where("date2", ">=", userdata.date1)
        );
        const querySnapshot = await getDocs(usersQuery);
        const newData = [];
        function check_in(mydoc) {
          if (mydoc.date1 >= userdata.date1 && mydoc.date2 <= userdata.date2) {
            return true;
          } else if (
            mydoc.date1 <= userdata.date1 &&
            mydoc.date2 <= userdata.date2
          ) {
            return true;
          } else if (
            mydoc.date1 < userdata.date2 &&
            mydoc.date2 > userdata.date2
          ) {
            return true;
          } else {
            return false;
          }
        }
        querySnapshot.docs.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };
          if (check_in(data)) {
            newData.push(data);
          }
        });
        setUsers(newData);
      }
      getData();
    }
  }, [userdata]);

  const [tushi, setTushi] = useState(true);
  const bottomEl = useRef(null);
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // You can use 'auto' for instant scrolling
    });

    if (bottomEl.current) {
      bottomEl.current.scrollTop = bottomEl.current.scrollHeight;
    }
  }, [my_messages, bottomEl]);

  const containerStyle = {
    // height: "100vh",
    // position: "absolute",
    bottom: 0,
    left: 0,
    right: 0, // Enables vertical scrolling
  };

  function sign_out() {
    logout().then((res) => {
      if (res) {
        setuser()
        refi();
      }
    });
  }
  return (
    <div>
      <NavbarChat myset={setTushi} users={allUsers} sign_out={sign_out} />
      <section className="py-5" style={containerStyle}>
        <div className="panel-body">
          <div className="chats" ref={bottomEl}>
            {my_messages.map((msg) => (
              <Message
                msgData={msg}
                key={msg.id}
                my_message={msg.uid === userdata.uid}
              />
            ))}
          </div>
        </div>
      </section>
      {tushi ? <TypeMessage userdata={userdata} /> : ""}
    </div>
  );
}

export default Chat;
