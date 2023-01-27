import React from "react"
import "./style.css";

export default function Room() {
  return (
    <>
      <section className="msger">
        <header className="msger-header bg-black-400">
          <div className="msger-header-title bg-black-400">
            <img src="img/4chat.png" alt="4chat" className="mx-auto h-10 w-auto"/>
          </div>

          <div className="msger-header-options">
            <span>
              <i className="fas fa-cog"></i>
            </span>
          </div>

          <div>
            <button className="signOut-btn">Sign out</button>
            <button className="settings-btn">Settings</button>
          </div>
        </header>
        <header>
          <div className="roomName-header bg-blue-700">
                <h1>test</h1>
          </div>
          <div>
          </div>
        </header>
        <main className="msger-chat">
          <div className="msg left-msg">
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">BOT</div>
                <div className="msg-info-time">12:45</div>
              </div>

              <div className="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>
          <div className="test!!">
          <form className="msger-inbox">
          
        </form>
        </div>
          <div className="msg right-msg">
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">Sajad</div>
                <div className="msg-info-time">12:46</div>
              </div>

              <div className="msg-text">
                You can change your name in JS section!
              </div>
            </div>
          </div>
        </main>
    
        <div></div>
        <form className="msger-inputarea">
          <input
            type="text"
            className="msger-input"
            placeholder="Enter your message..."
          />
          <button type="submit" className="msger-send-btn">
            Send
          </button>         
        </form>
        
      </section>

    </>
  )
}
