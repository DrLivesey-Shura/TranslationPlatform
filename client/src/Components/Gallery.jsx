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
import TranslateModal from "./TranslateModal";
import DeleteAlertDialog from "./DeleteAlertDialog";

const Gallery = ({ files, onDelete, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [selectedUploadId, setSelectedUploadId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isTranslateModalOpen, setTranslateModalOpen] = useState(
    Array(files.length).fill(false)
  );
  const handleDelete = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.delete(
        `/api/upload/delete/${selectedUploadId}`,
        {
          data: { userId: user._id },
        },
        config
      );

      if (response.status === 200) {
        onDelete(selectedUploadId);
      }
    } catch (error) {
      console.error("Error deleting upload:", error);
    }
  };

  return (
    <SimpleGrid my="20px" templateColumns="repeat(3, 1fr)">
      <AnimatePresence>
        {files.map(({ photo, _id }, index) => (
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
                <Button
                  onClick={() => {
                    const updatedState = [...isTranslateModalOpen];
                    updatedState[index] = true;
                    setTranslateModalOpen(updatedState);
                  }}
                  width="100px"
                  mr="12px"
                  bg="#3887BE"
                >
                  Translate
                </Button>
                <TranslateModal
                  user={user}
                  file={photo}
                  fileID={_id}
                  isOpen={isTranslateModalOpen[index]}
                  onClose={() => {
                    const updatedState = [...isTranslateModalOpen];
                    updatedState[index] = false;
                    setTranslateModalOpen(updatedState);
                  }}
                />
                <Button
                  width="100px"
                  bg="rebeccapurple"
                  onClick={() => {
                    setSelectedUploadId(_id);
                    setDeleteDialogOpen(true);
                  }}
                >
                  Delete
                </Button>
                <DeleteAlertDialog
                  isOpen={isDeleteDialogOpen}
                  onClose={() => setDeleteDialogOpen(false)}
                  onDelete={() => {
                    handleDelete();
                    setDeleteDialogOpen(false);
                  }}
                />
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </SimpleGrid>
  );
};

export default Gallery;
