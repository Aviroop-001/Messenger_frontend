import React, { useState, useEffect } from "react";
import { Flex, Button } from "@chakra-ui/react";
import UserList from "./UserList";
import Users from "./Users";
import UserMessages from "./UserMessages";
import MessageSearch from "./MessageSearch";

function MessageDashboard({ agentData, setagentData }) {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearchModalOpen = () => {
    setIsSearchModalOpen(true);
  };

  const handleSearchModalClose = () => {
    setIsSearchModalOpen(false);
  };

   useEffect(() => {
     console.log("Re-render");
   }, [setagentData]);

  return (
    <Flex>
      <Button onClick={handleSearchModalOpen}>SEARCH</Button>
      <MessageSearch
        setSelectedUserId={setSelectedUserId}
        agentData={agentData}
        isOpen={isSearchModalOpen}
        onClose={handleSearchModalClose}
      />
      <Users
        setSelectedUserId={setSelectedUserId}
        agentData={agentData}
        setagentData={setagentData}
      />
      <UserMessages
        agentData={agentData}
        setagentData={setagentData}
        selectedUserId={selectedUserId}
      />
    </Flex>
  );
}

export default MessageDashboard;
