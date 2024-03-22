import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import React from 'react';

function SearchTable2({ user, translations, fileInfo, onDelete }) {
  const columnsData = [
    'NAME',
    'LANGUAGE',
    'DATE',
    'TRANSLATOR',
    'STATUS',
    'PAYMENT',
    'CANCEL',
  ];

  const handleDeleteRequest = async (translationId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.delete(
        `/translation-demands/${translationId}`,
        config,
      );

      if (response.status === 200) {
        onDelete(translationId);
        console.log('Translation demand deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting translation demand:', error);
    }
  };

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const brandColor = useColorModeValue('brand.500', 'brand.400');
  return (
    <>
      <Flex
        direction="column"
        w="100%"
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
        <Flex
          align={{ sm: 'flex-start', lg: 'flex-start' }}
          justify={{ sm: 'flex-start', lg: 'flex-start' }}
          w="100%"
          px="22px"
          mb="36px"
        >
          <SearchBar h="44px" w={{ lg: '390px' }} borderRadius="16px" />
        </Flex>
        <Table variant="simple" color="gray.500" mb="24px">
          <Thead>
            <Tr>
              {columnsData.map((column, i) => (
                <Th key={i} pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color="gray.400"
                  >
                    {column}
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {fileInfo &&
              fileInfo.map((fileInfo, i) => (
                <Tr key={i}>
                  <Td
                    fontSize={{ sm: '14px' }}
                    minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                    borderColor={borderColor}
                  >
                    <Flex align="center">
                      <Flex direction="column">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {fileInfo.photo.split('.')[0]}{' '}
                          {/* Display file name */}
                        </Text>
                        <Text
                          color="secondaryGray.500"
                          fontSize="sm"
                          fontWeight="600"
                        >
                          {fileInfo.photo.split('.')[1]}{' '}
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  {translations && translations[i] && (
                    <>
                      <Td
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor={borderColor}
                      >
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {translations[i].language}
                          </Text>
                        </Flex>
                      </Td>
                      <Td
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor={borderColor}
                      >
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {new Date(translations[i].createdAt).toLocaleString(
                              'en-US',
                              {
                                dateStyle: 'full',
                                timeStyle: 'long',
                              },
                            )}
                          </Text>
                        </Flex>
                      </Td>
                      <Td
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor={borderColor}
                      >
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            Tou La
                          </Text>
                        </Flex>
                      </Td>
                      <Td
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor={borderColor}
                      >
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {translations[i].status}
                          </Text>
                        </Flex>
                      </Td>
                      <Td
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor={borderColor}
                      >
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {translations[i].paymentStatus}
                          </Text>
                        </Flex>
                      </Td>
                      <Td
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor={borderColor}
                      >
                        <Flex align="center">
                          <Button
                            onClick={() =>
                              handleDeleteRequest(translations[i]._id)
                            }
                          >
                            CANCEL
                          </Button>
                        </Flex>
                      </Td>
                    </>
                  )}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default SearchTable2;
