import { useEffect, useState } from "react";
import Loader from "../Loader";
import "./setting.css";
import { format } from "date-fns";
import { collection, getDocs } from "firebase/firestore";
import { db, updateUserData } from "../../firebase";

function Setting({ userdata }) {
  const [my_name, setName] = useState("");
  const [my_date1, setDate1] = useState();
  const [my_date2, setDate2] = useState();
  const [my_des, setMyDes] = useState();
  const [destinations, setDes] = useState([]);

  useEffect(() => {
    if (userdata) {
      setName(userdata.name);
      setMyDes(userdata.destination);
      setDate1(
        userdata.date1 ? format(new Date(userdata.date1), "yyyy-MM-dd") : ""
      );
      setDate2(
        userdata.date2 ? format(new Date(userdata.date2), "yyyy-MM-dd") : ""
      );
    }
  }, [userdata]);

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const newData = [];
      querySnapshot.docs.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        newData.push(data);
      });
      setDes(newData);
    }
    getData();
  }, []);

  function my_update(e){
    e.preventDefault();
    const newdata={
        id: userdata.uid,
        date1: new Date(my_date1).getTime(),
        date2: new Date(my_date2).getTime(),
        name: my_name,
        destination: parseInt(my_des)
    };
    updateUserData(newdata).then((res) =>{
        console.log(res)
    })
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-4 pb-5">
          <div className="author-card pb-3">
            {/* <div className="author-card-cover" style="background-image: url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg);"><a className="btn btn-style-1 btn-white btn-sm" href="#" data-toggle="tooltip" title="" data-original-title="You currently have 290 Reward points to spend"><i className="fa fa-award text-md"></i>&nbsp;290 points</a></div> */}
            <div className="author-card-profile">
              <div className="author-card-avatar">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt="..."
                />
              </div>
              <div className="author-card-details">
                <h5 className="author-card-name text-lg">{userdata.name}</h5>
                <span className="author-card-position">
                  {/* Joined February 06, 2017 */}
                  {userdata.email}
                </span>
              </div>
            </div>
          </div>
          <div className="wizard">
            <nav className="list-group list-group-flush">
              <a
                className="list-group-item active"
                href="https://www.bootdey.com/snippets/view/bs4-account-tickets"
                target="__blank"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fe-icon-tag mr-1 text-muted"></i>
                    <div className="d-inline-block font-weight-medium text-uppercase">
                      Profile Settings
                    </div>
                  </div>
                  <span className="badge badge-secondary">4</span>
                </div>
              </a>
            </nav>
          </div>
        </div>
        <div className="col-lg-8 pb-5">
          <form
            method="POST"
            onSubmit={(e) => my_update(e)}
          >
            <Loader loaderSize={10} isLoad={false} />
            {/* {errMsg && (
              <div className="alert alert-danger" role="alert">
                username or password wrong
              </div>
            )} */}
            <div className="form-floating mb-3 mt-3">
              <input
                onChange={(e) => setName(e.target.value)}
                value={my_name}
                type="text"
                placeholder="Name"
                className="form-control"
                id="floatingInput"
              ></input>
              <label htmlFor="floatingInput">Name</label>
            </div>
            
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setDate1(e.target.value)}
                value={my_date1? my_date1:""}
                type="date"
                className="form-control"
                id="floatingPassword"
              ></input>
              <label htmlFor="floatingPassword">Start date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setDate2(e.target.value)}
                value={my_date2? my_date2:""}
                type="date"
                className="form-control"
                id="floatingPassword1"
              ></input>
              <label htmlFor="floatingPassword1">End date</label>
            </div>
            <div className="form-floating mb-3">
              <select
                value={my_des}
                onChange={(e) => setMyDes(parseInt(e.target.value))}
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {destinations.map((des) => (
                  <option key={des.id} value={des.val}>
                    {des.destination}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelect">Works with selects</label>
            </div>

            <button
              disabled={false}
              type="submit"
              className="btn btn-outline-dark form-control"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Setting;
