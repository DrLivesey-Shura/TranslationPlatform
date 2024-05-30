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
      <Flex flexDirection="row" my="20px">
        <Flex flexDirection="column" width="45%">
          <Box mx="12px" direction="column" mb="10px">
            <Card>
              <Flex
                flexDirection="column"
                alignItems="center"
                mx="20px"
                py="20px"
              >
                <Text
                  mb="18px"
                  fontSize="lg"
                  fontWeight="700"
                  lineHeight="100%"
                >
                  Hello {user.name}
                </Text>
                <Text>
                  Welcome to Tou La Translation Platform! This is your gateway
                  to seamless and accurate translation services. Our platform is
                  designed to provide a reliable and efficient solution for all
                  your translation needs. Whether you require document
                  translation, website localization, or multilingual support,
                  Tou La is here to assist you.
                </Text>
              </Flex>
            </Card>
          </Box>
          <Box mx="12px" direction="column">
            <Card>
              <Flex flexDirection="column" mx="20px" py="20px">
                <Text
                  alignSelf="center"
                  mb="18px"
                  fontSize="28px"
                  fontWeight="700"
                  lineHeight="100%"
                >
                  User Information <br />
                </Text>
                <Box>
                  <Text fontSize="18px">
                    Full Name &nbsp;: &nbsp; {user.name} <br />
                  </Text>
                  <Text fontSize="18px">
                    Email &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: &nbsp;{' '}
                    {user.email}
                  </Text>
                  <Text fontSize="18px">
                    Level &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;: &nbsp; {user.level}{' '}
                  </Text>
                  <Text fontSize="18px">
                    Phone &nbsp; &nbsp; &nbsp;&nbsp;: &nbsp; {user.phone}{' '}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        </Flex>
        <Flex width="45%">
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
