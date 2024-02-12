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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

const Gallery = ({ files, onDelete, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [selectedUploadId, setSelectedUploadId] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/upload/delete/${selectedUploadId}`,
        {
          data: { userId: user._id },
        }
      );

      if (response.status === 200) {
        onDelete(selectedUploadId);
      }
    } catch (error) {
      console.error("Error deleting upload:", error);
    }
  };

  return (
    <SimpleGrid templateColumns="repeat(3, 1fr)">
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
                <Button width="100px" mr="12px" bg="#3887BE">
                  Download
                </Button>
                <Button
                  width="100px"
                  bg="rebeccapurple"
                  onClick={() => {
                    setSelectedUploadId(_id);
                    onOpen();
                  }}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete File
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => onClose()}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </SimpleGrid>
  );
};

export default Gallery;
