
export default function Navbar(){
return<>

<header className="msger-header bg-black-400">
          <div className="msger-header-title bg-black-400">
            <img src="img/4chat.png" alt="4chat" className="mx-auto h-10 w-auto"/>
          </div>

          <div className="msger-header-options">
            <span>
              <i className="fas fa-cog"></i>
            </span>
          </div>

          <div className="nav-btn">
          <button className="settings-btn">Settings</button>
            <button className="signOut-btn">Sign out</button>
            
          </div>
        </header>
</>
}