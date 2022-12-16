import React, { useEffect, useState } from "react";

const ChatBar = ({ socket, buddy, setBuddy }) => {
  let [date, setDate] = useState(new Date()); // date variable used to find the time
  const [users, setUsers] = useState([]);

  // update the time every one second
  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      setUsers(data);
      if (!users.includes(buddy)) setBuddy("");
    });
  }, [socket, users, buddy, setBuddy]);
  return (
    <div className="chat__sidebar">
      <h2>NI HAO CHAT</h2>

      {/* display the time / clock */}
      <h3>{date.toLocaleTimeString()}</h3>
      <h3>{buddy}</h3>

      <div className="chat__users">
        {users.map((user) =>
          user.userName !== localStorage.getItem("userName") ? (
            <div key={user.socketID}>
              <input
                type="radio"
                name="buddy"
                value={user.userName}
                onChange={(e) => setBuddy(e.target.value)}
              />
              {user.userName}
            </div>
          ) : (
            <p key={user.socketID}>{user.userName}</p>
          )
        )}
      </div>
    </div>
  );
};

export default ChatBar;
