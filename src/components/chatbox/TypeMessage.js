import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { addMessage } from "../../firebase.js";

function TypeMessage({ userdata }) {
  const [my_message, setMessage] = useState("");
  function send(e){
    e.preventDefault();
    const msg = my_message;
    setMessage("");
    addMessage(userdata.uid, userdata.destination, userdata.date1, userdata.date2, my_message).then((res)=>{
      if(!res){
        setMessage(msg);
      }
    });
  }
  return (
    <div
      style={{
        bottom: "0%",
        margin: "10px 10px 0px 10px",
      }}
      className="fixed-bottom"
      role="alert"
    >
      <form method="POST" onSubmit={(e)=>send(e)} className="custom-search" style={{ marginBottom: "15px", zIndex:"900" }}>
        <input
        value={my_message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="custom-search-input"
          placeholder="Message"
        />
        <button
          style={{ height: "30px", width: "30px" }}
          className="custom-search-botton"
          type="submit"
        >
          <IoSendSharp style={{ marginBottom: "3px" }} />
        </button>
      </form>
    </div>
  );
}

export default TypeMessage;
