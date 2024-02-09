import React from "react";
import {
  chakra,
  Box,
  Container,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      w="100%"
      px="8px"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("black", "white")}
    >
      <Container
        as={Stack}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "center" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© 2022 Chakra Templates. All rights reserved</Text>
      </Container>
    </Box>
  );
};

export default Footer;
