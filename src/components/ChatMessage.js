import Avatar from '../assets/quizAvatar.jpg';
export const ChatMessage = ({ message }) => {
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