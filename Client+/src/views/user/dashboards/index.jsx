import React, { useState } from 'react';
// Chakra imports
import {
  Flex,
  useColorModeValue,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Default({ user }) {
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <Flex pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Flex flexDirection={{ md: 'row', sm: 'column' }} my="20px">
        <Flex flexDirection="column" width={{ base: '45%', sm: '95%' }}>
          <Box mx="20px" direction="column">
            <Card>
              <Flex flexDirection="column" mx="20px" py="20px">
                <Text
                  alignSelf="center"
                  mb="18px"
                  fontSize="28px"
                  fontWeight="700"
                  lineHeight="100%"
                >
                  Your Informations <br />
                </Text>
                <Box display="flex" flexDirection="column">
                  <Text fontSize="18px">{user.name}</Text>
                  <Text fontSize="18px">{user.email}</Text>
                  <Text fontSize="18px">{user.level} </Text>
                  <Text fontSize="18px">{user.phone} </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        </Flex>
        <Flex mt={{ md: '0', sm: '25px' }} width="95%">
          <Card mx="12px">
            <Flex flexDirection="column">
              <Text
                alignSelf="center"
                mb="25px"
                fontSize="28px"
                fontWeight="700"
                lineHeight="100%"
              >
                Features <br />
              </Text>
              <UnorderedList>
                <ListItem>
                  TouLa stands out for its commitment to delivering precise and
                  culturally relevant translations.
                </ListItem>
                <br />
                <ListItem>
                  Our team of experienced linguists ensures that each
                  translation captures the nuances and context of the original
                  content, providing you with the highest quality results.
                </ListItem>
                <br />
                <ListItem>
                  Explore the diverse range of services offered by TouLa, and
                  experience the convenience of a platform that prioritizes
                  accuracy, efficiency, and customer satisfaction.
                </ListItem>
                <br />
                <ListItem>
                  Say goodbye to language barriers, and let TouLa be your
                  trusted partner in the world of translation.
                </ListItem>
              </UnorderedList>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
}
