import React, { useEffect, useState } from "react";

const ChatBar = () => {
  let [date, setDate] = useState(new Date()); // date variable used to find the time

  // update the time every one second
  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <div className="chat__sidebar">
      <h2>NI HAO CHAT</h2>

      {/* display the time / clock */}
      <h3>{date.toLocaleTimeString()}</h3>
    </div>
  );
};

export default ChatBar;
