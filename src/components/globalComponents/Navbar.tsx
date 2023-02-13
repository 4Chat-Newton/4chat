import ButtonComponent from "./ButtonComponent"
import "./Navbar.css"
import { useNavigate } from "react-router";

export default function Navbar() {

  const navigate = useNavigate();

  const handleSignout = async () => {

    await fetch('/data/login', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },

    }).then(() => {
      navigate("/login");
    }).catch(err => {
      console.error(err);
    });
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
        <ButtonComponent className="settings-btn">Settings</ButtonComponent>
        <ButtonComponent className="signOut-btn" onClick={handleSignout}>Sign out</ButtonComponent>
      </div>
    </header>
  </>
}