import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import Navbar from './navbar';
import Footer from './Footer';

const Features = () => {
  return (
    <>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />

        <Box flex="1" p={8} maxWidth="800px" mx="auto">
          <Heading as="h1" mb={6} textAlign="center">
            Features
          </Heading>
          <VStack spacing={5} align="start">
            <Text fontSize="lg">
              <strong>Toula</strong> grants you human translators with expertise
              in many fields to maintain the accuracy and integrity of the
              original text, providing you with the highest quality results.
            </Text>
            <Text fontSize="lg">
              <strong>Toula</strong> leverages a network of human translators to
              work concurrently on different parts of a document, speeding up
              the overall translation process in order to ensure timely delivery
              without sacrificing quality.
            </Text>
            <Text fontSize="lg">
              <strong>Toula</strong> stands out for its commitment to
              interpreting ambiguous phrases or idioms based on the surrounding
              content, ensuring a more precise and culturally relevant
              translation.
            </Text>
            <Text fontSize="lg">
              <strong>Toula</strong> tailors translations to specific audiences,
              taking into account factors such as age and education level in
              order to ensure that the translated content resonates with the
              intended audience and effectively communicates the message.
            </Text>
            <Text fontSize="lg">
              <strong>Toula</strong> ensures that sensitive information remains
              confidential and is not compromised during the translation
              process, employing secure communication channels to protect user
              data.
            </Text>
          </VStack>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Features;
