import React, { useRef, useState, useEffect } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const messageInput = useRef()
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

  useEffect(() => {
    messageInput.current.focus()
  }, [])
  

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
