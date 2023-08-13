import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from '../api'
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Button,
  VStack
} from "@chakra-ui/react";

function UserList({ setSelectedUserId }) {
  const [userIds, setUserIds] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/messages/userIds");
      setUserIds(res.data);
      console.log("users fetched!");
    } catch (err) {
      console.log("ERROR_", err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleUserClick = (userId) => {
    console.log(userId);
    setSelectedUserId(userId);
  };

  return (
    <Box
      width="35vw"
      border="1px solid red"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItem="center"
      height="100vh"
    >
      <Heading marginBottom="1rem" textAlign="center">
        User List
      </Heading>
      <VStack
        padding="0.5rem 0px"
        overflow="visible"
        overflowY="scroll"
        height="100%"
        scrollBehavior="smooth"
      >
        <UnorderedList
          width="90%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItem="center"
        >
          {userIds.map((userId) => (
            <ListItem
              width="100%"
              key={userId}
              display="flex"
              justifyContent="center"
              alignItem="center"
            >
              <Button
                width="20rem"
                colorScheme="teal"
                margin="0.5rem"
                onClick={() => handleUserClick(userId)}
              >
                User {userId}
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      </VStack>
    </Box>
  );
}

export default UserList;
