import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Button,
  VStack,
} from "@chakra-ui/react";
import api from "../api";

function Users({ setSelectedUserId, agentData, setagentData }) {
  const [userIds, setUserIds] = useState([]);
  const [myUsers, setMyUsers] = useState(agentData.usersAccepted);
  const [respondingUser, setRespondingUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState("all");

  const fetchPendingUsers = async () => {
    try {
      const res = await api.get("/api/users/pending");
      const sortedUsers = res.data.sort((a, b) => (b.isUrgent ? 1 : -1));

      setUserIds(sortedUsers);
      // setUserIds(res.data);
      console.log("users fetched!");
    } catch (err) {
      console.log("ERROR_", err);
    }
  };

  useEffect(() => {
    setInterval(() => {
        fetchPendingUsers();
    }, 1000);
  }, []);

  useEffect(() => {
    console.log("My users changed");
  }, [myUsers]);

  const handleUserClick = (userId) => {
    console.log(userId);
    setSelectedUserId(userId);
  };

  const handleAddUser = async (userID) => {
    try {
    const res = await api.post("/api/agents/addUser", {
        "agentName": agentData.agentName,
        "userId": userID
    });
    setagentData(res.data);
    setMyUsers(res.data.usersAccepted);
    console.log("User added");
  } catch (error) {
    console.error("Error adding user to agent:", error);
    throw error;
  }
};

const handleRemoveUser = async (userID) => {
  try {
    const res = await api.post("/api/agents/removeUser", {
      agentName: agentData.agentName,
      userId: userID,
    });
    setagentData(res.data);
    setMyUsers(res.data.usersAccepted);
    console.log("User removed");
  } catch (error) {
    console.error("Error removing user from agent:", error);
    throw error;
  }
};


  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const renderUserList = () => {
    if (selectedTab === "all") {
      return (
        <UnorderedList
          width="90%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          {userIds.map((userId) => (
            <ListItem
              width="100%"
              key={userId.userID}
              display="flex"
              justifyContent="center"
            >
              <Button
                width="20rem"
                colorScheme="teal"
                margin="0.5rem"
                onClick={() => handleUserClick(userId.userID)}
              >
                User {userId.userID}
                <Button
                  marginLeft="1rem"
                  colorScheme="red"
                  onClick={() => handleAddUser(userId.userID)}
                >
                  {userId.isResolved? "RESOLVED": "+"}
                </Button>
                {userId.isUrgent && (
                  <Box
                    width="1rem"
                    height="1rem"
                    borderRadius="50%"
                    ml="5"
                    backgroundColor="blue"
                  >
                    &nbsp;{" "}
                  </Box>
                )}
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      );
    } else if (selectedTab === "my") {
      return (
        <UnorderedList
          width="90%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          {agentData.usersAccepted.map((user) => (
            <ListItem
              width="100%"
              key={user.userID}
              display="flex"
              justifyContent="center"
            >
              <Button
                width="20rem"
                colorScheme="green"
                margin="0.5rem"
                onClick={() => handleUserClick(user.userID)}
              >
                My User {user.userID}
                {user.isUrgent && <Box width='1rem' height='1rem' borderRadius='50%' ml='5' backgroundColor='blue'> &nbsp;</Box>}
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      );
    }
  };

  return (
    <Box
      width="35vw"
      // border="1px solid red"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
    >
      <Heading marginBottom="1rem" textAlign="center">
        User List
      </Heading>
      <Button onClick={() => handleTabChange("all")} marginRight="0.5rem">
        All Users
      </Button>
      <Button onClick={() => handleTabChange("my")}>My Users</Button>
      <VStack
        padding="0.5rem 0px"
        overflow="visible"
        overflowY="scroll"
        height="100%"
        scrollBehavior="smooth"
      >
        {renderUserList()}
      </VStack>
    </Box>
  );
}

export default Users;
