import React, { useState } from "react";
import { Box, Heading, Input, Button } from "@chakra-ui/react";
import api from "../api";

function ClientLogin({ setclientData }) {
  const [clientName, setclientName] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.get(`api/users/${clientName}`);
      setclientData(res.data);
      console.log(res.data);
      console.log("Client in!");
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
          Client Login
        </Heading>
        <Input
          placeholder="Enter your name"
          value={clientName}
          onChange={(e) => setclientName(e.target.value)}
          mb="4"
        />
        <Button colorScheme="teal" onClick={handleLogin} isFullWidth>
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default ClientLogin;
