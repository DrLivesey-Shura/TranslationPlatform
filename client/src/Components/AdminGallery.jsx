import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
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
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

const AdminGallery = ({ files, onDelete, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUploadId, setSelectedUploadId] = useState(null);
  const [uploaderInfo, setUploaderInfo] = useState();

  const handleUploaderInfo = async (uploadId) => {
    setSelectedUploadId(uploadId);
    await fetchUploaderInfo(uploadId);
    onOpen();
  };

  const fetchUploaderInfo = async (uploadId) => {
    try {
      const response = await axios.get(`/api/user/byupload/${uploadId}`);
      if (response.status === 200) {
        setUploaderInfo(response.data);
      }
    } catch (error) {
      console.error("Error fetching uploader info:", error);
    }
  };

  return (
    <SimpleGrid my="20px" templateColumns="repeat(3, 1fr)">
      <AnimatePresence>
        {files.map(({ photo, _id }) => (
          <motion.div
            key={_id}
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
          >
            <Card
              bg={useColorModeValue("#ffffffcc", "#171923cc")}
              key={_id}
              m="12px"
              w="380px"
              display="flex"
              flexDirection="column"
            >
              <CardHeader>
                <Heading size="md">{photo}</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
              <CardFooter justifyItems="center" justifyContent="center">
                <Button color="white" width="100px" mr="12px" bg="#3887BE">
                  Download
                </Button>
                <Button
                  onClick={() => handleUploaderInfo(_id)}
                  color="white"
                  width="fit-content"
                  bg="rebeccapurple"
                >
                  Uploader Informations
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Uploader Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {uploaderInfo && (
              <Box>
                <Text>{uploaderInfo.name}</Text>
                <Text>{uploaderInfo.email}</Text>
                <Text>{uploaderInfo.phone}</Text>
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
    </SimpleGrid>
  );
};

export default AdminGallery;
