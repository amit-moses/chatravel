import { FaUsers } from "react-icons/fa";
import OneUser from "./OneUser";
import "./users.css";
import { IoCloseSharp } from "react-icons/io5";

function UsersShared({myset, users}) {
  return (
    <>
      <a onClick={()=>myset(false)} href="#popUp" className="btn btn-outline-dark">
        <FaUsers />
      </a>

      <aside id="popUp" className="popup">
        <div className="popUpContainer">
          <header>
            <a onClick={()=> myset(true)} href="#!" className="closePopUp">
              <IoCloseSharp />
            </a>
            <h2>Nicee!</h2>
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
      </aside>
    </>
  );
}

export default UsersShared;
