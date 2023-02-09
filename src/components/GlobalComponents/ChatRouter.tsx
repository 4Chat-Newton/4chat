import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../../App";
import Login from "../../pages/Authentication/Login";
import Register from "../../pages/Authentication/Register";
import Terms from "../../pages/Terms";
import ChatRoom from "../../pages/ChatRoom";
import ProtectedRoutes from "./ProtectedRoutes";

function ChatRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/chatroom" element={<ChatRoom />} />
        </Route>
      </Routes>
    </>
  );
}

export default ChatRouter;
