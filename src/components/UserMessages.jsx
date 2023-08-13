import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import api from "../api";

function UserMessages() {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get(`/api/messages/${userId}`)
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, [userId]);

  return (
    <div>
      <h2>User {userId} Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>{message.text}</li>
        ))}
      </ul>
      {/* <AdminPanel userId={userId} /> */}
    </div>
  );
}

export default UserMessages;
