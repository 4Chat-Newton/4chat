import { Routes, Route } from "react-router-dom";
import App from "../../App";
import Login from "../../pages/authentication/Login";
import Register from "../../pages/authentication/Register";
import Terms from "../../pages/Terms";
import ChatRoom from "../../pages/ChatRoom";
import ProtectedRoutes from "./ProtectedRoutes";
import NoPage from "../../pages/NoPage";
import Settings from "../../pages/settings/Settings";
import DeleteAccount from "../../pages/settings/DeleteAccount";
import {io} from "socket.io-client";
import {API_BASE_URL} from "../../consts";
function ChatRouter() {

  const socket = io(API_BASE_URL);

  socket.onAny((event, ...args) => {
    // console.log("CLIENT: ", event, args);
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={< Login socketConnection={socket} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route element={<ProtectedRoutes />}>
        <Route path="/settings" element={<Settings />} />
        <Route path="/deleteaccount" element={<DeleteAccount />} />
          <Route path="/chatroom" element={<ChatRoom socketConnection={socket} />} />
          <Route path="/chatroom/:activeRoom" element={<ChatRoom socketConnection={socket} />} />
        </Route>
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default ChatRouter;
