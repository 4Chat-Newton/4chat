import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import App from "../App";
import Login from "./Login";
import Register from "./Register"
import Terms from "./Terms";

function ChatRouter() {

    return <>
    <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/terms" element={<Terms/>}/>
    </Routes>
    </>

};

export default ChatRouter