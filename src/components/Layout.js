import '../normalize.css'
import '../App.css'
import { useContext, useState } from 'react';
import { ApiContext } from '../ApiContext';
export const Layout = () => {
  const {setChatLog, models, setCurrentModel, setTemperature, currentModel, temperature, tokens, setTokens} = useContext(ApiContext);
  const clearChatLog = () => {
    setChatLog([]);
  }
  return (
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
          engine models to prevent server overload and querying options for more
          robust responses.
        </p>
      </div>
    </aside>
  );
};
