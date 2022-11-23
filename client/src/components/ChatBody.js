import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages }) => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>NI HAO</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          BYE BYE
        </button>
      </header>

      {/*This shows messages sent from you*/}

      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
                {message.date}
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                {message.date}
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
        {/* <div className="message__status">
          <p>Someone is typing...</p>
        </div> */}
      </div>
    </>
  );
};

export default ChatBody;
