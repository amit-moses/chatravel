function OneUser({userData}) {
  return (
    <div className="list-item">
      <div>
        <a href="/">
          <img className="w-48 avatari gd-warning" alt="..." src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
        </a>
      </div>
      <div className="flex">
        <a href="/" className="item-author text-color">
          {userData.name}
        </a>
      </div>
    </div>
  );
}

export default OneUser;
