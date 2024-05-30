import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import dropin from 'braintree-web-drop-in';
import axios from 'axios';

function PaymentModal({ isOpen, onClose, user, price, handlePayRequest }) {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Fetch the client token from the server
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      axios
        .get(`/braintree/getToken/${user._id}`, config)
        .then((response) => {
          setClientToken(response.data.clientToken);
        })
        .catch((error) => {
          console.error('Error fetching client token:', error);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (clientToken) {
      // Initialize Braintree Drop-in
      dropin.create(
        {
          authorization: clientToken,
          container: '#dropin-container',
        },
        (error, dropinInstance) => {
          if (error) {
            console.error('Error creating drop-in:', error);
          } else {
            setInstance(dropinInstance);
          }
        },
      );
    }
  }, [clientToken]);

  const handlePayment = () => {
    instance.requestPaymentMethod((error, payload) => {
      console.log('payload : ', payload);
      if (error) {
        console.error('Error requesting payment method:', error);
      } else {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        // Send the nonce to your server
        axios
          .post(
            `/braintree/payment/${user._id}`,
            {
              paymentMethodNonce: payload.nonce,
              amount: price,
            },
            config,
          )
          .then((response) => {
            console.log('Payment success:', response.data);
            handlePayRequest();
            onClose();
          })
          .catch((error) => {
            console.error('Payment error:', error);
          });
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div id="dropin-container"></div>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            size="lg"
            width="100%"
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PaymentModal;
