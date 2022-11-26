// eslint-disable-next-line
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import socketIO from "socket.io-client";

const socket = socketIO.connect(
  `http://${process.env.REACT_APP_IP_ADDRESS}:4000` // Connect to server, strictly on the given ip address and port
);
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* Route to sign in page */}
          <Route path="/" element={<Home socket={socket} />}></Route> 

          {/* Route to chat room page */}
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
