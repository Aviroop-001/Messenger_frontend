import React, { useState } from "react";
import AdminMessage from "./AdminMessage";
import { Box, Button, Tag } from "@chakra-ui/react";
import { useSocket } from "./socket";

function AdminPanel({ userId }) {
  const [isReplying, setIsReplying] = useState(false);
  const socket = useSocket();

  const handleReplyStart = () => {
    setIsReplying(true);
    socket.emit("admin-reply-start", userId); // Notify other admins in the room
  };

  const handleReplyEnd = () => {
    setIsReplying(false);
    socket.emit("admin-reply-end", userId); // Notify other admins in the room
  };

  // Join the room when component mounts
  socket.emit("join-room", userId);

  return (
    <Box>
      {isReplying ? (
        <Tag colorScheme="yellow">Admin is currently responding</Tag>
      ) : (
        <>
          <Button onClick={handleReplyStart} colorScheme="teal" mr={2}>
            Start Responding
          </Button>
          <Button onClick={handleReplyEnd} colorScheme="red">
            Finish Responding
          </Button>
        </>
      )}
      {isReplying && <AdminMessage userId={userId} />}
    </Box>
  );
}

export default AdminPanel;
