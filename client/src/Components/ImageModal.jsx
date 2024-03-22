import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { useState } from "react";

const ImageModal = ({ smallImageUrl, largeImageUrl, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Box>
      <Image
        src={smallImageUrl}
        alt={alt}
        onClick={handleOpen}
        cursor="pointer"
      />
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Image src={largeImageUrl} alt={alt} width="100%" height="100%" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImageModal;
