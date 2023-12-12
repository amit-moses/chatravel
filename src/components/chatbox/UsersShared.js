import { FaUsers } from "react-icons/fa";
import OneUser from "./OneUser";
import "./users.css";

function UsersShared({myset, users}) {
  return (
    <>
      <a onClick={()=>myset(false)} href="#popUp" className="btn btn-outline-dark">
        <FaUsers />
      </a>

      <a onClick={()=> myset(true)} href="#!" id="popUp" className="popup">
        <div style={{overflowY: "scroll"}} className="popUpContainer">
          <header className="">
          </header>
          <article>
            <div style={{overflowY:"auto"}} className="">
              <div className="list list-row block">
              {users.map((user) => (
              <OneUser
                userData={user}
                key={user.id}
              />
            ))}
              </div>
            </div>
          </article>
        </div>
      </a>
    </>
  );
}

export default UsersShared;
