import React, { useRef, useState, useEffect } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState(""); // message variable that will be sent to the server

  // used to focus on the text box upon mounting the component
  const messageInput = useRef();
  useEffect(() => {
    messageInput.current.focus();
  }, []);

  // the function that sends the message to the server
  const handleSendMessage = (e) => {
    const date = new Date();
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        date: date.toLocaleTimeString(),
      });
      setMessage("");
    }
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          ref={messageInput}
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
