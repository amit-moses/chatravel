import { format } from "date-fns";
function Message({ my_message, msgData }) {
  const my_date = new Date(msgData.time);
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
          <p>{msgData.message}</p>
          <time className={my_message? "chat-time d-flex":"chat-time d-flex justify-content-end"}>
            {format(my_date, "kk:mm")}
          </time>
        </div>
      </div>
    </div>
  );
}

export default Message;
