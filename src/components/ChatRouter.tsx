import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import Register from "./Register";
import Terms from "./Terms";
import Chat from "./Room";
import Inbox from "./Inbox";

function ChatRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/room" element={<Chat />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </>
  );
}

export default ChatRouter;
