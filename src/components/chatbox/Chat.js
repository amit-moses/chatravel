import NavbarChat from "./NavbarChat";
import TypeMessage from "./TypeMessage";
import "../../chat.css";
import Message from "./Message";
import { useEffect } from "react";

function Chat({ userdata, my_messages }) {
  
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // You can use 'auto' for instant scrolling
    });
  }, [my_messages]);

  const containerStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0, // Enables vertical scrolling
  };
  
  return (
    <div style={containerStyle}>
      <NavbarChat />
      <section  className="py-5">
        <div className="panel-body">
          <div className="chats">
            {my_messages.map((msg) => (
              <Message msgData={msg} key={msg.id} my_message={msg.uid === userdata.uid} />
            ))}
          </div>
        </div>
      </section>
      <TypeMessage userdata={userdata} />
    </div>
  );
}

export default Chat;
