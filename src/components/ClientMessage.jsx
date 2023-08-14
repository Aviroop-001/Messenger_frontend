import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Input, Center, Heading } from "@chakra-ui/react";
import api from "../api";

function ClientMessage({ clientData, setclientData }) {
  const [message, setMessage] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSendMessage = async () => {
    try {
      const res = await api.post("/api/users/message", {
        userID: clientData.userID,
        messageBody: message,
        isUrgent: isUrgent,
      });
      setclientData(res.data);
      setMessage("");
      setIsUrgent(false);
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() =>{
    setInterval(() => {
        
    }, 2000);
    console.log("render again");
  }, [])

  return (
    <Center height="100vh">
      <Box width="800px">
        <Heading mb='5'>Hi {clientData.userID}</Heading>
        {clientData.userMessages.map((message) => (
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
        <Input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          mb="2"
        />
        <Checkbox
          isChecked={isUrgent}
          onChange={(e) => setIsUrgent(e.target.checked)}
          mb="2"
          display="block"
        >
          Urgent
        </Checkbox>
        <Button
          colorScheme="teal"
          mb="2"
          onClick={handleSendMessage}
          isFullWidth
        >
          Send Message
        </Button>
      </Box>
    </Center>
  );
}

export default ClientMessage;
