import "./Navbar.css"
import { useNavigate } from "react-router";

export default function Navbar() {

    const navigate = useNavigate();

    const logOut = async () => {
        await fetch('http://localhost:8080/data/login', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ localStorage.getItem("token") }`
            }
        }).then(function (response) {
            if (response.status === 200) {
                localStorage.clear()
                navigate("/login")
            } else {
                alert(`Error couldn't sign out`)
            }
        })
    }

    const handleHome = () => {
        navigate("/")
    }

    return <>

        <header className="navbar-header">
            <div className="nav-head">
                <img src="img/4chat.png" alt="4chat" className="mx-auto h-10 w-auto" onClick={handleHome} />
            </div>

            <div className="navbar-header-options">
        <span>
          <i className="fas fa-cog"></i>
        </span>
            </div>

            <div className="nav-btn">
                <button className="settings-btn">Settings</button>
                <button className="signOut-btn" onClick={logOut}>Sign out</button>
            </div>
        </header>
    </>
}