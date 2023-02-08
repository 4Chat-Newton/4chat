import ButtonComponent from "./ButtonComponent"
import "./Navbar.css"
import { useNavigate } from "react-router";

export default function Navbar() {

  const navigate = useNavigate();

  const handleSignout = async () => {
    //TODO fetch should be '/data/login'
    await fetch('http://localhost:8080/data/login', {
        method: 'DELETE'
    })
    navigate("/login");
    }


  return <>

    <header className="navbar-header">
      <div className="nav-head">
        <img src="img/4chat.png" alt="4chat" className="mx-auto h-10 w-auto" />
      </div>

      <div className="navbar-header-options">
        <span>
          <i className="fas fa-cog"></i>
        </span>
      </div>

      <div className="nav-btn">
        <ButtonComponent className="settings-btn">Settings</ButtonComponent>
        <ButtonComponent className="signOut-btn" onClick={handleSignout}>Sign out</ButtonComponent>
      </div>
    </header>
  </>
}