import "./App.css";
import "./normalize.css";
import Avatar from "./assets/quizAvatar.jpg";
import { useState, useEffect } from "react";
function App() {
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [tokens, setTokens] = useState(100);
  const [temperature, setTemperature] = useState(5);
  const [currentModel, setCurrentModel] = useState("ada");
  const [chatLog, setChatLog] = useState([]);

  const clearChat = () => {
    setChatLog([]);
  };
  useEffect(() => {
    getEngines();
  }, []);
  const getEngines = async () => {
    fetch("http://localhost:3080/models")
      .then((response) => response.json())
      .then((data) => setModels(data.models));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "Me", message: `${input}` }];
    setInput("");
    setChatLog([...chatLogNew]);
    const messages = chatLogNew.map((message) => message.message).join("\n");
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: messages,
        currentModel,
        tokens,
        temperature,
      }),
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
  };
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenubutton" onClick={clearChat}>

          
        
        
        <div className="temperature">
          <label>Specificity</label>
          <input value={temperature} type="range" min="1" max="10" onChange={({ target: { value: radius } }) => {
                    setTemperature(radius);
                  }}/>
        </div>
        <div className="tokens">
          <p className="boldp">Context Length</p>
          <p className="warning">Hard Cap of 1000</p>
          <input className="token-input" value={tokens} type="number" max={1000} onChange={(e) => setTokens(e.target.value)}/>
        </div>
        <div className="models">
          <label>Engine</label>
          <select className="engine-select" onChange={(e) => setCurrentModel(e.target.value)}>
            {models.map((model, index) => (
              <option key={model.id} value={model.id}>
                {model.id}
              </option>
            ))}
          </select>
        </div>
        </div>
          <div className="sidemenubutton intro-frame">
              <p>Welcome to a short project I made called Inquisitor Quizzer</p>
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
