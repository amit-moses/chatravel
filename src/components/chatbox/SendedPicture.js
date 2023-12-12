function SendedPicture({ url, idmsg }) {
  return (
    <>
      <a href={"#popUp" + idmsg}>
        <img alt="..." src={url} style={{ height: "10vh" }} />
      </a>

      <a href="#!" id={"popUp" + idmsg} className="popup">
        <div className="popUpContainer">
          <header className=""></header>
          <article>
            <img alt="..." src={url} style={{ height: "auto" }} />
          </article>
        </div>
      </a>
    </>
  );
}

export default SendedPicture;
