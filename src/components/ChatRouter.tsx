import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import App from "../App";
import Login from "./Login";
import Register from "./Register"
import Test from "./Test";


function ChatRouter() {

    return <>
    <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/test" element={ <Test /> } />
    </Routes>
    </>

};

export default ChatRouter