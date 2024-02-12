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
      bg={useColorModeValue("#ffffffcc", "#171923cc")}
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
        <Text>© 2024 WE ARE WE. All rights reserved</Text>
      </Container>
    </Box>
  );
};

export default Footer;
