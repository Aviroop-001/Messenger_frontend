import React, { useState } from "react";
import { Box, Heading, Input, Button, ChakraProvider } from "@chakra-ui/react";
import api from "../api";

function Login({agentData, loginHandler }) {
  const [agentName, setagentName] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/api/agents/login", { "agentName": agentName });
      loginHandler(res.data);
      console.log(res.data);
      console.log("Agent in!");
    } catch (err) {
      console.log("ERROR_", err);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="300px" p="4" boxShadow="lg" rounded="md" bg="white">
        <Heading mb="4" textAlign="center">
          Agent Login
        </Heading>
        <Input
          placeholder="Enter your name"
          value={agentName}
          onChange={(e) => setagentName(e.target.value)}
          mb="4"
        />
        <Button colorScheme="teal" onClick={handleLogin} isFullWidth>
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
