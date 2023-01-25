export const CompletionPage = () => {
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [tokens, setTokens] = useState(100);
  const [temperature, setTemperature] = useState(5);
  const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [chatLog, setChatLog] = useState([]);

  const clearChatLog = () => {
    setChatLog([]);
  };
  useEffect(() => {
    getEngines();
  }, []);
  const getEngines = async () => {
    fetch("https://dukequeryapiendpoint.web.app/models")
      .then((response) => response.json())
      .then((data) => {
        const temp = data.models;
        const filtered = temp.filter((model) =>
          model.id.includes("text-davinci-")
        );
        setModels(filtered);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "Me", message: `${input}` }];
    setInput("");
    setChatLog([...chatLogNew]);
    const messages = chatLogNew.map((message) => message.message).join("\n");
    const newTemp = temperature / 10;
    const response = await fetch(
      "https://dukequeryapiendpoint.web.app/question-post",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messages,
          currentModel,
          tokens,
          newTemp,
        }),
      }
    );
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
  };
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenubutton">
          <div>
            <button onClick={clearChatLog}>
              <div className="boldp">Clear Chat</div>
            </button>
          </div>
          <div className="temperature">
            <label>Creativity</label>
            <input
              value={temperature}
              type="range"
              min="1"
              max="10"
              onChange={({ target: { value: radius } }) => {
                setTemperature(radius);
              }}
            />
          </div>
          <div className="tokens">
            <p className="boldp">Context Length</p>
            <p className="warning">Hard Cap of 1000</p>
            <input
              className="token-input"
              value={tokens}
              type="number"
              max={1000}
              onChange={(e) => setTokens(e.target.value)}
            />
          </div>
          <div className="models">
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
            Built off of OpenAI's API I present a more flexible AI with multiple
            engine models to prevent server overload and querying options for
            more robust responses.
          </p>
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
};
