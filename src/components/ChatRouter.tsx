import {Routes, Route} from "react-router-dom" //TODO add "BrowserRouter as Router" later when needed
import App from "../App";
import Login from "./Login";
import Register from "./Register"
//import Settings from "./Settings"

function ChatRouter() {

    return <>
    <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/settings" element={<></> } />
    </Routes>
    </>

};

export default ChatRouter