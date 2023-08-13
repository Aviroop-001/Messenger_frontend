import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import UserList from "./UserList";
import UserMessages from "./UserMessages";

function MessageDashboard() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <Flex>
      <UserList setSelectedUserId={setSelectedUserId} />
      <UserMessages selectedUserId={selectedUserId} />
    </Flex>
  );
}

export default MessageDashboard;
