// Chakra imports
import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
// Assets
import { HSeparator } from 'components/separator/Separator';
import React from 'react';
// Custom components

export default function Content(props) {
  const { file, translation, ...rest } = props;
  console.log(translation);
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  let paid = 0;
  let total = 0;

  return (
    <Flex
      direction="column"
      p={{ base: '20px', md: '34px' }}
      px={{ base: '0px', md: '34px' }}
      {...rest}
    >
      <Flex mt="70px" direction={{ base: 'column', md: 'row' }}>
        <Box me="auto" mb={{ base: '40px', lg: '0px' }}>
          <Text fontSize="lg" fontWeight="700" color={textColor}>
            Resume payment
          </Text>
          <Stack
            fontSize="md"
            fontWeight="400"
            color="secondaryGray.600"
            maxW="322px"
          >
            <Text
              mt="12px"
              fontSize="md"
              fontWeight="400"
              color="secondaryGray.600"
              maxW="322px"
            >
              Translation Name : {translation.label}{' '}
            </Text>
            <Text
              mt="12px"
              fontSize="md"
              fontWeight="400"
              color="secondaryGray.600"
              maxW="322px"
            >
              File Name : {translation.uploadId.file}{' '}
            </Text>

            <Text
              mt="12px"
              fontSize="md"
              fontWeight="400"
              color="secondaryGray.600"
              maxW="322px"
            >
              Translate to : {translation.language}{' '}
            </Text>
            <Text
              fontSize="md"
              fontWeight="400"
              color="secondaryGray.600"
              maxW="322px"
            >
              Number of pages : {file.numPages}
            </Text>
            <Text
              fontSize="md"
              fontWeight="400"
              color="secondaryGray.600"
              maxW="322px"
            >
              Number of words :{file.numWords}
            </Text>
          </Stack>
        </Box>
        <Box>
          <Flex align="center" justifyContent="space-between" mb="12px">
            <Text
              textAlign="end"
              color={textColor}
              fontSize="lg"
              fontWeight="400"
            >
              Traduction fee's :
            </Text>
            <Text color={textColor} fontSize="lg" fontWeight="700" maxW="292px">
              {(file.numWords * 1.5).toFixed(2)} DZD
            </Text>
          </Flex>
          <Flex align="center" justifyContent="space-between">
            <Text
              me="70px"
              fontWeight="400"
              textAlign="end"
              color={textColor}
              fontSize="lg"
            >
              Paid to bost
            </Text>
            <Text color={textColor} fontSize="lg" fontWeight="700" maxW="292px">
              0$
            </Text>
          </Flex>
          <HSeparator my="20px" />
          <Flex align="center" justifyContent="space-between">
            <Text
              me="70px"
              fontWeight="400"
              textAlign="end"
              color={textColor}
              fontSize="lg"
            >
              Amount to pay
            </Text>
            <Text color={textColor} fontSize="lg" fontWeight="700" maxW="292px">
              {(file.numWords * 1.5).toFixed(2)} DZD
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
