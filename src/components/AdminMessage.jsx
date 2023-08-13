import React, { useState } from "react";
import { useSocket } from "./socket";

function AdminMessage({ userId }) {
  const socket = useSocket();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Send the message and notify other admins
    socket.emit("admin-reply-start", userId);
    // Code to send the message to the backend API
    // ...

    // Reset the message input
    setMessage("");
    socket.emit("admin-reply-end", userId);
  };

  return (
    <div>
      <textarea
        rows="4"
        cols="50"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default AdminMessage;
