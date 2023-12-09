import { ImExit } from "react-icons/im";
import UsersShared from "./UsersShared";


function NavbarChat({myset, users}) {

  return (
    <nav className="navbar bg-light navbar-expand-lg fixed-top">
      <div className="container-fluid d-flex justify-content-between">
      {/* <button className="btn btn-outline-dark">
          <FaUsers />
        </button> */}
        <UsersShared myset={myset} users={users}/>
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
        <button className="btn btn-outline-dark">
          <ImExit />
        </button>
      </div>
    </nav>
  );
}
export default NavbarChat;
