import { ImExit } from "react-icons/im";
import { IoPersonAdd } from "react-icons/io5";


function NavbarChat() {
  return (
    <nav className="navbar bg-light navbar-expand-lg fixed-top">
      <div className="container-fluid d-flex justify-content-between">
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
          <button
            style={{ marginRight: "2px" }}
            className="btn btn-outline-dark"
          >
            <IoPersonAdd/>
          </button>
          <button
            style={{ marginLeft: "2px" }}
            className="btn btn-outline-dark"
          >
            <ImExit/>
          </button>
        </div>
      </div>
    </nav>
  );
}
export default NavbarChat;
