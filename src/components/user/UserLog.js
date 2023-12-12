import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function UserLog({refi}) {
  const [isLogin, setLogin] = useState(true);

  return (
    <div className="py-5 container text-center">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          {isLogin ? 
            <Login refi={refi} /> : <Register refi={refi} />}
          <button
            className="mt-3 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover btn btn-link"
            onClick={() => setLogin(!isLogin)}
          >
            {isLogin
              ? "Don't you have yet account? register now"
              : "Do you have already account? log-in"}
          </button>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default UserLog;
