import React, { useState, useEffect, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]); // list of all the messages so far
  const lastMessageRef = useRef(null); // reference to the latest message
  const [buddy, setBuddy] = useState("");

  // listen from the server to update the list of messages
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages(data);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.emit("newBuddy", {
      name: localStorage.getItem("userName"),
      buddy: buddy,
    });
  }, [socket, buddy]);

  // scroll to the latest message
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} buddy={buddy} setBuddy={setBuddy} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          buddy={buddy}
        />
        <ChatFooter socket={socket} buddy={buddy} />
      </div>
    </div>
  );
};

export default ChatPage;
