import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
} from "@chakra-ui/react";

const TranslateModal = ({ isOpen, onClose, file }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Translate</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Demand for translating {file} </FormLabel>

            <FormLabel>I need it before..</FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
            />
            <FormLabel>Language</FormLabel>
            <Select placeholder="Select Language">
              <option>French</option>
              <option>English</option>
              <option>Espagne</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button width="120px" colorScheme="red" mx="10px" onClick={onClose}>
            Close
          </Button>
          <Button width="120px" mx="10px" colorScheme="blue">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TranslateModal;
