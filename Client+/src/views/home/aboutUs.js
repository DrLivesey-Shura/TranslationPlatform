import { Box, Button, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
// import "../index.css";
import { HiArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './Footer';

const Header = () => {
  return (
    <>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />

        <Box mt="20px" flex="1" p={8} maxWidth="800px" mx="auto">
          <Heading as="h1" mb={6} textAlign="center">
            About Us
          </Heading>
          <VStack spacing={5} align="start">
            <Text fontSize="lg">
              Welcome to <strong>Online Translation Platform</strong>, your
              trusted partner for professional translation services.
            </Text>
            <Text fontSize="lg">
              At <strong>Online Translation Platform</strong>, our mission is to
              bridge language barriers through accurate, reliable, and fast
              translations. We are a team of passionate linguists, skilled
              translators, and dedicated professionals committed to delivering
              high-quality translation services. Our team comprises translators
              and experts in various fields, ensuring that every translation is
              not only linguistically accurate but also culturally relevant.
            </Text>
          </VStack>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Header;
