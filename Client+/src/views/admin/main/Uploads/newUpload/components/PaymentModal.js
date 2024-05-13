import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

function PaymentModal({ isOpen, onClose, handlePayRequest }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4} pb={2} fontWeight="bold">
            <FormLabel>Card Information:</FormLabel>
            <Input
              color={textColor}
              type="text"
              placeholder="Cardholder's Name"
              size="lg"
              my="12px"
            />
            <Input
              color={textColor}
              type="number"
              placeholder="Card Number"
              size="lg"
              mb="12px"
            />
            <Stack direction="row">
              <Input
                color={textColor}
                type="date"
                placeholder="Expire (MM/YYYY)"
                size="lg"
              />
              <Input
                color={textColor}
                type="password"
                placeholder="CVV"
                size="lg"
              />
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            size="lg"
            width="100%"
            variant="darkBrand"
            onClick={handlePayRequest} // Pass the function to handle payment
          >
            Pay Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default PaymentModal;
