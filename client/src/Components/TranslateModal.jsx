import React, { useState } from "react";
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
import axios from "axios";

const TranslateModal = ({ isOpen, onClose, file, fileID, user }) => {
  const [demandData, setDemandData] = useState({
    date: "",
    language: "",
  });

  const userId = user._id;

  const handleDateChange = (e) => {
    setDemandData({ ...demandData, date: e.target.value });
  };

  const handleLanguageChange = (e) => {
    setDemandData({ ...demandData, language: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(file);
    console.log(fileID);
    try {
      const response = await axios.post("/api/translation-demands", {
        uploadId: fileID,
        userId: userId,
        estimatedDate: demandData.date,
        language: demandData.language,
      });

      if (response.status === 201) {
        console.log("Translation demand created successfully");
        onClose();
      }
    } catch (error) {
      console.error("Error creating translation demand:", error);
    }
  };

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
              onChange={handleDateChange}
            />
            <FormLabel>Language</FormLabel>
            <Select
              onChange={handleLanguageChange}
              placeholder="Select Language"
            >
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
          <Button
            onClick={handleSubmit}
            width="120px"
            mx="10px"
            colorScheme="blue"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TranslateModal;
