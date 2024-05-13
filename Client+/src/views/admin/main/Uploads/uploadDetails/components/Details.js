// Chakra imports
import { Flex, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
import Barcode from 'assets/img/ecommerce/Code-128.png';
// Custom components
import Card from 'components/card/Card.js';
import React from 'react';

export default function YourOrderSteps(props) {
  const { ...rest } = props;
  const user = JSON.parse(localStorage.getItem('userInfo'));

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  return (
    <Card
      direction="column"
      w="100%"
      p="35px"
      flexDirection={{ base: 'column', md: 'row' }}
      {...rest}
    >
      <Flex flexDirection="column" me={{ base: '0px', md: '100px' }}>
        <Text
          color="secondaryGray.600"
          fontSize="md"
          fontWeight="400"
          lineHeight="26px"
        >
          Customer Details:
        </Text>
        <Text
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="26px"
        >
          {user.name}
        </Text>
        <Text
          color="secondaryGray.600"
          fontSize="md"
          fontWeight="400"
          lineHeight="26px"
        >
          {user.level}
          <br />
          {user.username}
        </Text>
      </Flex>
      <Flex flexDirection="column" mt={{ base: '20px', md: '0px' }}>
        <Text
          color="secondaryGray.600"
          fontSize="md"
          fontWeight="400"
          lineHeight="26px"
        >
          {user.phone}
        </Text>
        <Link
          color={brandColor}
          href="#"
          textDecoration="underline"
          fontSize="md"
          fontWeight="500"
          lineHeight="26px"
        >
          {user.email}
        </Link>
        <Text
          color="secondaryGray.600"
          fontSize="md"
          fontWeight="400"
          lineHeight="26px"
        >
          July 27, 2022 at 09:44 AM
          {/* {user.createdAt} */}
        </Text>
      </Flex>
      <Image
        alignSelf="center"
        ms={{ base: '0px', md: 'auto' }}
        mt={{ base: '20px', md: '0px' }}
        src={Barcode}
      />
    </Card>
  );
}
