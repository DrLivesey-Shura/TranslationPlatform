import React from "react";
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

const Profile = ({ user, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Uploader Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {user && (
            <Box>
              <Text>Name : {user.name}</Text>
              {user.email ? (
                <Text>Email : {user.email}</Text>
              ) : (
                <Text>CCP : {user.ccp} </Text>
              )}

              {user.phone ? <Text>Phone : {user.phone}</Text> : <></>}
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Profile;
