import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import App from "../App";

function ChatRouter() {

    return <>
    <Routes>
        <Route path="/" element={ <App /> } />
    </Routes>
    </>

};

export default ChatRouter