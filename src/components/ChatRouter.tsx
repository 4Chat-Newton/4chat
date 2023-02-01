import {Routes, Route} from "react-router-dom" //TODO add "BrowserRouter as Router" later when needed
import App from "../App";
import Login from "./Login";
import Register from "./Register"

function ChatRouter() {

    return <>
    <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
    </Routes>
    </>

};

export default ChatRouter