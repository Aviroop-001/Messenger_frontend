import React, { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
import { Box, Heading, Tag } from "@chakra-ui/react";
// import { useSocket } from "./socket";
import api from "../api";

function UserMessages({ selectedUserId }) {
  const [messages, setMessages] = useState([]);
  const [responding, setResponding] = useState(false); // Change here
  // const socket = useSocket();

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/api/users/messages/${selectedUserId}`);
      setMessages(res.data);
      console.log("messages fetched!");
    } catch (err) {
      console.log("ERROR_", err);
    }
  };
  

useEffect(() => {
  fetchMessages();
}, [selectedUserId])
//  useEffect(() => {
//    // Listen for "admin-reply-start" event to show responding status
//    socket.on("admin-reply-start", () => {
//      setResponding(true);
//    });

//    // Listen for "admin-reply-end" event to clear responding status
//    socket.on("admin-reply-end", () => {
//      setResponding(false);
//    });

//    // Fetch messages and join room when selectedUserId changes
//    fetchMessages();
//    socket.emit("join-room", selectedUserId);

//    return () => {
//      // Cleanup event listeners and leave room
//      socket.off("admin-reply-start");
//      socket.off("admin-reply-end");
//      socket.emit("leave-room", selectedUserId);
//    };
//  }, [selectedUserId, socket]);


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
      {/* <AdminPanel userId={selectedUserId} /> */}
    </div>
  );
}

export default UserMessages;
