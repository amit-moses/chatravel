function Message({ my_message }) {
  return (
    <div className={my_message ? "chat" : "chat-left"}>
      <div className="chat-avatar">
        <div className="avatar avatar-online">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="..."
          />
          <i></i>
        </div>
      </div>
      <div className="chat-body">
        <div className="chat-content" style={{maxWidth:"75%"}}>
          <p>If necessary, please askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase askase ask me.</p>
          <time className={my_message? "chat-time d-flex":"chat-time d-flex justify-content-end"} datetime="2015-07-01T11:40">
            11:40:10 am
          </time>
        </div>
      </div>
    </div>
  );
}

export default Message;
