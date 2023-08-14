import React, { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
import { Box, Heading, Tag, Input, Button, Tooltip } from "@chakra-ui/react";
import api from "../api";

function UserMessages({ selectedUserId, agentData, setagentData }) {
  const [messages, setMessages] = useState([]);
  const [responding, setResponding] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [canReply, setcanReply] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/api/users/${selectedUserId}`);
      setMessages(res.data);
      setcanReply(res.data.isAccepted);
      console.log("messages fetched!");
    } catch (err) {
      console.log("ERROR_", err);
    }
  };


  const handleSendPreFormedReply = async (reply) => {
    try {
      await api.post("/api/agents/reply", {
        userId: selectedUserId,
        replyMessage: reply,
      });
      fetchMessages();
      console.log("Pre-formed reply sent successfully");
    } catch (error) {
      console.error("Error sending pre-formed reply:", error);
    }
  };

  const handleSendReply = async () => {
    try {
      await api.post("/api/agents/reply", {
        userId: selectedUserId,
        replyMessage: replyMessage,
      });
      setReplyMessage("");
      fetchMessages();
      console.log("Reply sent successfully");
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const handleRemoveUser = async (userID) => {
    try {
      const res = await api.post("/api/agents/removeUser", {
        agentName: agentData.agentName,
        userId: userID,
      });
      setagentData(res.data);
      // setMyUsers(res.data.usersAccepted);
      console.log("User removed");
    } catch (error) {
      console.error("Error removing user from agent:", error);
      throw error;
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
      <Heading mb="5" textAlign="center" padding="1px auto">
        User {selectedUserId} Messages
        <Tooltip label={messages.description || ""}>
          <Box display='inline-block' fontSize='20px' border='1px solid black' borderRadius='50%' height='1.7rem' width='1.7rem' ml='2rem'>i</Box>
        </Tooltip>
      </Heading>
      {messages.userMessages.map((message) => (
        <Box
          width="fit-content"
          backgroundColor={message.isAgentReply ? "green.200" : "red.200"}
          margin="0.2rem"
          borderRadius="5px"
          key={message._id}
          padding="5px 10px"
        >
          {message.messageBody}
        </Box>
      ))}
      {canReply && (
        <Box width="80%" mt="10" textAlign="center" padding="1px auto">
          {/* Pre-formed reply buttons */}
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() =>
              handleSendPreFormedReply("Thank you for reaching out!")
            }
          >
            Thank You
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() =>
              handleSendPreFormedReply(
                "We'll look into this matter right away."
              )
            }
            ml="3"
          >
            Urgent Matter
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() =>
              handleSendPreFormedReply("Could you please provide more details?")
            }
            ml="3"
          >
            More Details
          </Button>
          <Input
            placeholder="Enter your reply..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleSendReply}>
            Send Reply
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleRemoveUser(selectedUserId)}
            ml="5"
          >
            Resolve
          </Button>
        </Box>
      )}
    </div>
  );
}

export default UserMessages;
