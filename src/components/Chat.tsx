import "./style.css";
export default function Chat(){
    return<>
    <div className="chatWindow">
        <section className="roomName">
          <div className="roomName-header bg-blue-700">
                <h1>test</h1>
          </div>


        </section>
        <section className="chat">
            <ul className="text">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.imilique autem placeat adipisci voluptatem nam quibusdam?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quos. Eligendi eum tempore earum ipsam totam dolorum quae ha</p>

            </ul>
        </section>
        
    </div>
    <div></div>
    <div className="msg">
        <input
            type="text"
            className="msger-input"
            placeholder="Enter your message..."
          />
          <button type="submit" className="send">
            Send
          </button>
        </div>
    
    </>
}