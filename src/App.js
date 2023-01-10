import "./App.css";
import "./normalize.css";
import Avatar from "./assets/chatgptavatar.png";
import { useState } from "react";
function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "How can I help you today?",
    },
    {
      user: "me",
      message: "How do I write an HTTP request",
    },
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setChatLog([...chatLog], { user: "Me", message: `${input}` });
    setInput("");
  };
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenubutton">
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chatlog">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
            
          ))}
        </div>

        <div className="chatinputholder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              className="chatinputtextarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chatmessage ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chatmessagecenter">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" && <img className="avatar" src={Avatar} />}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};
export default App;
