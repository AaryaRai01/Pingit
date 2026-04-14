import { useState, useEffect, useRef } from "react";
import "./App.css";

const WS_URL = "wss://x8oc8wg518.execute-api.us-east-1.amazonaws.com/prod";

function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  const ws = useRef(null);
  const bottomRef = useRef(null);
  const usernameRef = useRef("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const connect = () => {
    if (!username.trim()) return;

    usernameRef.current = username;

    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      setConnected(true);
      setLoggedIn(true);
    };

    ws.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);

        setMessages((prev) => {
          const last = prev[prev.length - 1];

          if (
            last &&
            last.sender === data.sender &&
            last.timestamp === data.timestamp
          ) {
            return prev;
          }

          return [...prev, data];
        });
      } catch (error) {
        console.error("Message parse error:", error);
      }
    };

    ws.current.onclose = () => setConnected(false);
    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnected(false);
    };
  };

  const sendMessage = () => {
    if (!message.trim() || !ws.current) return;

    ws.current.send(
      JSON.stringify({
        action: "sendmessage",
        username: usernameRef.current,
        message,
        roomId: "general",
      })
    );

    setMessage("");
  };

  // LOGIN SCREEN
  if (!loggedIn) {
    return (
      <div className="login-screen">
        <div className="login-box">
          <div className="login-logo">
            <span className="logo-text">
              Ping<span className="logo-it">it</span>
            </span>
          </div>

          <p className="login-tagline">Ping anyone, instantly.</p>

          <input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && connect()}
          />

          <button onClick={connect}>Start Pinging →</button>
        </div>
      </div>
    );
  }

  // CHAT SCREEN
  return (
    <div className="chat-screen">
      <div className="chat-header">
        <div className="header-left">
          <span className="header-logo">
            Ping<span className="logo-it">it</span>
          </span>
          <span className="header-sub">
            # general • {connected ? "live" : "offline"}
          </span>
        </div>

        <div className={`status ${connected ? "online" : "offline"}`}>
          <span className="dot"></span>
          {connected ? "Connected" : "Disconnected"}
        </div>
      </div>

      <div className="messages">
        {messages.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👋</div>
            <p>No pings yet — say hello!</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`message-row ${
              m.sender === usernameRef.current ? "mine" : "theirs"
            }`}
          >
            {m.sender !== usernameRef.current && (
              <div className="avatar">
                {m.sender?.[0]?.toUpperCase() || "?"}
              </div>
            )}

            <div className="bubble-wrap">
              {m.sender !== usernameRef.current && (
                <span className="msg-sender">{m.sender || "Unknown"}</span>
              )}

              <div className="bubble">
                <span className="msg-text">{m.message || ""}</span>

                <span className="msg-time">
                  {m.timestamp
                    ? new Date(m.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      <div className="input-bar">
        <input
          placeholder="Ping something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;