import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/quizAvatar.jpg";
import "../styles/EditPage.css";
function TextEditPage() {
  const [models, setModels] = useState([]);
  const [input, setInput] = useState("");
  const [instructions, setInstructions] = useState("");
  const [temperature, setTemperature] = useState(5);
  const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [chatLog, setChatLog] = useState([]);
  const clearChatLog = () => {
    setChatLog([]);
  };
  useEffect(() => {
    getEngines();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('working')
    let chatLogNew = [...chatLog, { user: "Me", message: `${input}` }];
    setInput("");
    setChatLog([...chatLogNew]);
    const messages = chatLogNew.map((message) => message.message).join("\n");
    const newTemp = temperature / 10;

    const response = await fetch(
      "http://localhost:8080/text-edit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messages,
          currentModel,
          newTemp,
          instructions,
        }),
      }
    );
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
  };
  const getEngines = async () => {
    fetch("https://dukequeryapiendpoint.web.app/models")
      .then((response) => response.json())
      .then((data) => {
        const temp = data.models;
        const filtered = temp.filter((model) =>
          model.id.includes("text-davinci-0")
        );
        setModels(filtered);
      });
  };
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenubutton mobile-menu">
          <div className="margin5">
            <button onClick={clearChatLog}>
              <div className="boldp">Clear Chat</div>
            </button>
          </div>
          <div className="margin5">
            <label>Creativity</label>
            <input
              value={temperature}
              type="range"
              min="1"
              max="20"
              onChange={({ target: { value: radius } }) => {
                setTemperature(radius);
              }}
            />

            <label>Engine</label>
            <select
              className="engine-select"
              onChange={(e) => setCurrentModel(e.target.value)}
            >
              {models.map((model, index) => (
                <option key={model.id} value={model.id}>
                  {model.id}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="sidemenubutton intro-frame">
          <p>
            {" "}
            Have you ever needed a quick review? Maybe even a last minute spell check?
          </p>{" "}
          <p>Simply input your modification instructions and input the text you want edited!</p>
          <div className="links">
            <Link className="links" to="/">
              Text Completion
            </Link>
            <Link className="links" to="/image-generation">
              Image Generator
            </Link>
          </div>
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
            <label>Input</label>
            <input
              rows="1"
              className="chatinputtextarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></input>
            <label>Instructions</label>
            <input
              rows="1"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="blue chatinputtextarea"
            />
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
export default TextEditPage;
