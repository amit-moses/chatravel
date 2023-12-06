import { IoSendSharp } from "react-icons/io5";

function TypeMessage() {
  return (
    <div style={{bottom:"0%", margin:"10px 10px 0px 10px", background:"white"}} className="fixed-bottom" role="alert">
      <div className="custom-search" style={{marginBottom: "15px"}}>
        <input
          type="text"
          className="custom-search-input"
          placeholder="Message"/>
        <button style={{height:"30px", width:"30px"}} className="custom-search-botton" type="submit">
          <IoSendSharp style={{marginBottom:"3px"}}/>
        </button>
      </div>
    </div>
  );
}

export default TypeMessage;
