import { ImExit } from "react-icons/im";
import UsersShared from "./UsersShared";
import { IoSettingsSharp } from "react-icons/io5";

function NavbarChat({ myset, users, sign_out }) {
  return (
    <nav className="navbar bg-light navbar-expand-lg fixed-top">
      <div className="container-fluid d-flex justify-content-between">
        {/* <button className="btn btn-outline-dark">
          <FaUsers />
        </button> */}
        <UsersShared myset={myset} users={users} />
        <a className="navbar-brand" href="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
            alt="..."
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          Bootstrap
        </a>
        <div>
          <div>
            <button
              style={{ marginRight: "4px" }}
              className="btn btn-outline-dark"
            >
              <IoSettingsSharp />
            </button>
            <button
              style={{ marginLeft: "4px" }}
              className="btn btn-outline-dark"
              onClick={()=> sign_out()}
            >
              <ImExit />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default NavbarChat;
