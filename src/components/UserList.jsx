import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from '../api'
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Button,
} from "@chakra-ui/react";

function UserList() {
  const [userIds, setUserIds] = useState([]);

  const fetchUsers = async() => {
    try {
        const res = await api.get("/api/messages/userIds");
        setUserIds(res.data);
        console.log("users fetched!");
    } catch (err) {
        console.log("ERROR_", err);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box
      width="15rem"
      border="1px solid red"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItem="center"
    >
      <Heading marginBottom="1rem" textAlign="center">
        User List
      </Heading>
      <UnorderedList
        width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItem="center"
      >
        {userIds.map((userId) => (
          <ListItem width="100%" key={userId}>
            <Button width="80%" colorScheme="teal" margin="0.5rem">
              <Link to={`/${userId}`}>User {userId}</Link>
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}

export default UserList;
