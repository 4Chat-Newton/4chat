import { Routes, Route } from "react-router-dom";
import App from "../../App";
import Login from "../../pages/authentication/Login";
import Register from "../../pages/authentication/Register";
import Terms from "../../pages/Terms";
import ChatRoom from "../../pages/ChatRoom";
import NoPage from "../../pages/NoPage";
import Settings from "../../pages/settings/Settings";
import DeleteAccount from "../../pages/settings/DeleteAccount";
function ChatRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/deleteaccount" element={<DeleteAccount />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default ChatRouter;
