import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useSocket } from "./socket";

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
  const [respondingUser, setRespondingUser] = useState(null);

  // const socket = useSocket();

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

//  useEffect(() => {
//    // Listen for "admin-reply-start" event to show responding notification
//    socket.on("admin-reply-start", () => {
//      setRespondingUser(true);
//    });

//    // Listen for "admin-reply-end" event to clear responding notification
//    socket.on("admin-reply-end", () => {
//      setRespondingUser(false);
//    });

//    return () => {
//      // Cleanup event listeners
//      socket.off("admin-reply-start");
//      socket.off("admin-reply-end");
//    };
//  }, [socket]);
  
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
        >
          {userIds.map((userId) => (
            <ListItem
              width="100%"
              key={userId}
              display="flex"
              justifyContent="center"
            >
              <Button
                width="20rem"
                colorScheme={respondingUser === userId ? "red" : "teal"}
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
