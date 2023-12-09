import NavbarChat from "./NavbarChat";
import TypeMessage from "./TypeMessage";
import "./chat.css";
import Message from "./Message";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function Chat({ userdata, my_messages }) {
  const [allUsers, setUsers] = useState([]);
  useEffect(() => {
    if (userdata) {
      async function getData() {
        const usersQuery = query(
          collection(db, "users"),
          where("destination", "==", userdata.destination),
          where("date1", ">", userdata.date1 - 1209600000),
          // where("date2", ">=", userdata.date1)
        );
        const querySnapshot = await getDocs(usersQuery);
        const newData = [];
        function check_in(mydoc) {
          if(mydoc.date1 >= userdata.date1 && mydoc.date2 <= userdata.date2){return true;}
          else if(mydoc.date1 <= userdata.date1 && mydoc.date2 <= userdata.date2){return true;}
          else if (mydoc.date1 < userdata.date2 && mydoc.date2 > userdata.date2){return true;}
          else{return false;}
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
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // You can use 'auto' for instant scrolling
    });
  }, [my_messages]);

  const containerStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0, // Enables vertical scrolling
  };

  return (
    <div style={containerStyle}>
      <NavbarChat myset={setTushi} users={allUsers} />
      <section className="py-5">
        <div className="panel-body">
          <div className="chats">
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
