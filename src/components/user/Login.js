import { useState } from "react";
import Loader from "../Loader";
import { loginUser } from "../../firebase.js";

function Login({ refi }) {
  function login_func() {
    loginUser(ed_username, ed_password).then((res) => {
      refi();
    });
  }
  const [ed_username, setUsername] = useState("");
  const [ed_password, setPassword] = useState("");
  const errMsg = false;

  return (
    <form
      method="POST"
      onSubmit={(event) => {
        event.preventDefault();
        login_func(ed_username, ed_password);
      }}
    >
      <Loader loaderSize={10} isLoad={true} />
      {errMsg && (
        <div className="alert alert-danger" role="alert">
          username or password wrong
        </div>
      )}
      <div className="form-floating mb-3 mt-3">
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="email"
          placeholder="Email"
          className="form-control"
          id="floatingInput"
        ></input>
        <label htmlFor="floatingInput">Email</label>
      </div>
      <div className="form-floating mb-3">
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        ></input>
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <button
        disabled={false}
        type="submit"
        className="btn btn-outline-dark form-control"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
