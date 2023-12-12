import { IoSendSharp } from "react-icons/io5";

function OneUser({ userData }) {
  return (
    <div className="list-item justify-content-between">
      <div className="list-item">
        <div>
          <a href="/">
            <img
              className="w-48 avatari gd-warning"
              alt="..."
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
            />
          </a>
        </div>
        <div className="flex">
          <label>
            {userData.name}
          </label>
        </div>
      </div>
      <div className="no-wrap">
        <IoSendSharp style={{ marginBottom: "3px" }} />
      </div>
    </div>
  );
}

export default OneUser;
