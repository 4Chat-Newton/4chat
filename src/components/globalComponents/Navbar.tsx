import "./Navbar.css"

export default function Navbar() {
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
        <button id={"settings-btn"} className="settings-btn">Settings</button>
        <button id={"signOut-btn"} className="signOut-btn">Sign out</button>

      </div>
    </header>
  </>
}