import { createContext, useContext, useState, useEffect } from "react";

export const ApiContext = createContext();

export const useApi = () => {
  useContext(ApiContext);
};
export const ApiProvider = ({children}) => {
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [tokens, setTokens] = useState(100);
  const [temperature, setTemperature] = useState(5);
  const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [chatLog, setChatLog] = useState([]);

  const handleTextSubmit = async (e) => {
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


  const value = {
    input,
    setInput,
    models,
    setModels,
    tokens,
    setTokens,
    temperature,
    setTemperature,
    currentModel,
    setCurrentModel,
    chatLog,
    setChatLog,
    getEngines,
    handleTextSubmit
  }

  return (
    <ApiContext.Provider value={value}>
        {children}
    </ApiContext.Provider>
  )
};
