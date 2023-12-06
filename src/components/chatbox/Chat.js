import NavbarChat from "./NavbarChat";
import TypeMessage from "./TypeMessage";
import "../../chat.css";
import Message from "./Message";

function Chat() {
  return (
    <div>
      <NavbarChat />
      <section className="py-5">
      <div class="panel-body">
                <div class="chats">
                  <Message my_message={true}/> 
                  <Message my_message={false}/>  
                  <Message my_message={true}/>  
                  <Message my_message={true}/>  
                  <Message my_message={false}/> 
                  <Message my_message={false}/>    
                  <Message my_message={true}/>              
                </div>
              </div>
      </section>
      <TypeMessage />
    </div>
  );
}

export default Chat;
