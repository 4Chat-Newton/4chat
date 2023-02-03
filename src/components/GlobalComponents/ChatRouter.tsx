import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../../App";
import Login from "../../Pages/Authentication/Login";
import Register from "../../Pages/Authentication/Register";
import Terms from "../../Pages/Terms";
import ChatRoom from "../../Pages/ChatRoom";

function ChatRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
      </Routes>
    </>
  );
}

export default ChatRouter;
