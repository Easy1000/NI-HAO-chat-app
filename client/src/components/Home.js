import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const usernameInput = useRef()

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };

  useEffect(() => {
    usernameInput.current.focus()
  }, [])
  

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h1>你好</h1>
      <h2 className="home__header">Sign in to NĬ HĂO CHAT</h2>
      <label htmlFor="username">Username</label>
      <input
        ref={usernameInput}
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;
