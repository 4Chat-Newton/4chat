import { Routes, Route } from "react-router-dom";
import App from "../../App";
import Terms from "../../pages/Terms";
import ChatRoom from "../../pages/ChatRoom";
import Register from "../../pages/authentication/Register";
import Login from "../../pages/authentication/Login";
import NoPage from "../../pages/NoPage";

function ChatRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default ChatRouter;
