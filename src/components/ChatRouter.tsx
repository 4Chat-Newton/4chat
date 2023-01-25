import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
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