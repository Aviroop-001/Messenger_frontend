import React, { useState } from "react";
import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import api from "../api";

function MessageSearch({ setSelectedUserId, agentData, isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await api.get(`/api/agents/search/${searchTerm}`);
      setSearchResults(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("ERROR_", err);
    }
  };

  const handleUserClick = (userId) => {
    console.log(userId);
    setSelectedUserId(userId);
    onClose(); // Close the modal after selecting a user
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search Messages</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>

          <Divider mt={2} mb={2} />

          <List>
            {searchResults.map((message) => (
              <ListItem key={message._id}>
                <Button
                  width="20rem"
                  colorScheme="teal"
                  margin="0.5rem"
                  onClick={() => handleUserClick(message.userID)}
                >
                  User {message.userID}
                </Button>
              </ListItem>
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MessageSearch;
