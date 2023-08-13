import React, { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
import { Box, Heading } from "@chakra-ui/react";
import api from "../api";

function UserMessages({ selectedUserId }) {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/api/messages/${selectedUserId}`);
      setMessages(res.data);
      console.log("messages fetched!");
    } catch (err) {
      console.log("ERROR_", err);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedUserId]);

  if (!selectedUserId) {
    return <div>SELECT CHAT</div>;
  }
  return (
    <div>
      <Heading>User {selectedUserId} Messages</Heading>
      {messages.map((message) => (
        <Box
          width="fit-content"
          backgroundColor="pink"
          margin="0.2rem"
          borderRadius="5px"
          key={message._id}
        >
          {message.messageBody}
        </Box>
      ))}
      {/* <AdminPanel userId={userId} /> */}
    </div>
  );
}

export default UserMessages;
