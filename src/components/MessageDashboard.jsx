import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import UserList from "./UserList";
import Users from "./Users";
import UserMessages from "./UserMessages";

function MessageDashboard({ agentData, setagentData }) {
  const [selectedUserId, setSelectedUserId] = useState(null);

   useEffect(() => {
     console.log("Re-render");
   }, [setagentData]);

  return (
    <Flex>
      <Users
        setSelectedUserId={setSelectedUserId}
        agentData={agentData}
        setagentData={setagentData}
      />
      <UserMessages selectedUserId={selectedUserId} />
    </Flex>
  );
}

export default MessageDashboard;
