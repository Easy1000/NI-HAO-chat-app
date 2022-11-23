import React, { useEffect, useState } from "react";

const ChatBar = () => {
  let [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <div className="chat__sidebar">
      <h2>NI HAO CHAT</h2>
      <h3>{date.toLocaleTimeString()}</h3>
      {/* <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          <p>User 1</p>
          <p>User 2</p>
          <p>User 3</p>
          <p>User 4</p>
        </div>
      </div> */}
    </div>
  );
};

export default ChatBar;
