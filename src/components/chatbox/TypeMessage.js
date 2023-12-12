import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { MdImage } from "react-icons/md";

import { addMessage, handleUpload } from "../../firebase.js";

function TypeMessage({ userdata }) {
  const [my_message, setMessage] = useState("");
  const [process, setProcess] = useState(-1);
  function send_pic(e) {
    console.log(e);
    handleUpload(
      e.target.files[0],
      setProcess,
      userdata.uid,
      userdata.destination,
      userdata.date1,
      userdata.date2
    );
  }
  function send(e) {
    e.preventDefault();
    const msg = my_message;
    setMessage("");
    addMessage(
      userdata.uid,
      userdata.destination,
      userdata.date1,
      userdata.date2,
      my_message,
      0
    ).then((res) => {
      if (!res) {
        setMessage(msg);
      }
    });
  }
  return (
    <div
      style={{
        bottom: "0%",
        marginLeft: "10px 0px 0px 10px",
        background: "white",
        margin: "0px 10px 15px 10px"
      }}
      className="fixed-bottom"
      role="alert"
    >
      <div
        className="custom-search"
        style={{ zIndex: "900" }}
      >
        <form method="POST" onSubmit={(e) => send(e)}>
          <input
            dir="rtl"
            value={my_message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="custom-search-input"
            placeholder="הודעה"
          />
          <button
            style={{ height: "30px", width: "30px" }}
            className="custom-search-botton"
            type="submit"
          >
            <IoSendSharp style={{ marginBottom: "3px" }} />
          </button>
        </form>
        <input
          multiple={false}
          accept="image/*"
          type="file"
          onChange={(e) => {
            send_pic(e);
          }}
          style={{ display: "none" }}
          id="myfilebutton"
        />
        <label
          style={{ height: "30px", width: "30px" }}
          className="custom-add-botton"
          htmlFor="myfilebutton"
        >
          {process < 0 ? (
            <MdImage style={{ height: "20px", width: "20px" }} />
          ) : (
            process
          )}
        </label>
      </div>
    </div>
  );
}

export default TypeMessage;
