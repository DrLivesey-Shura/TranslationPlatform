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
  Badge,
} from '@chakra-ui/react';
import axios from 'axios';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import React, { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';

function SearchTable2({ user, translations, fileInfo, onDelete }) {
  const columnsData = [
    'NAME',
    'LANGUAGE',
    'DATE',
    'ESTIMATED DATE',
    'TRANSLATOR',
    'STATUS',
    'PAYMENT',
    'ACTION',
  ];

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const brandColor = useColorModeValue('brand.500', 'brand.400');

  const [isOpen, setIsOpen] = useState({});
  const onClose = (index) => {
    setIsOpen({ ...isOpen, [index]: false });
  };
  const cancelRef = useRef();

  const handleDeleteConfirmation = (index) => {
    setIsOpen({ ...isOpen, [index]: true });
  };

  const handleDeleteRequest = async (translationId, fileId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.delete(
        `/translation-demands/${translationId}`,
        config,
      );

      const response2 = await axios.delete(`/upload/delete/${fileId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        data: { userId: user._id }, // Include userId in the request body
      });

      if (response.status === 200 && response2.status === 200) {
        onDelete(translationId, fileId);
        console.log('Translation demand deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting translation demand:', error);
    }
  };

  const handleDownload = async (filename) => {
    const modifiedFilename = filename.replace(/(\.[\w\d_-]+)$/i, '_tr$1');
    try {
      const response = await axios.get(
        `/upload/download-translated/${modifiedFilename}`,
        {
          responseType: 'blob', // Receive response as a Blob
        },
      );
      console.log(response);
      // Create a temporary anchor element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Set the filename
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

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
                          {fileInfo.file.split('.')[0]}{' '}
                          {/* Display file name */}
                        </Text>
                        <Text
                          color="secondaryGray.500"
                          fontSize="sm"
                          fontWeight="600"
                        >
                          {fileInfo.file.split('.')[1]}{' '}
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  {translations && translations[i] && (
                    <>
                      {console.log('transaltion : ', translations)}
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
                            {new Date(
                              translations[i].estimatedDate,
                            ).toLocaleString('en-US', {
                              dateStyle: 'full',
                              timeStyle: 'long',
                            })}
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
                      {translations[i].status === 'Pending' &&
                        translations[i].adminValidationStatus !==
                          'Rejected' && (
                          <Td
                            fontSize={{ sm: '14px' }}
                            minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                            borderColor={borderColor}
                          >
                            <Flex align="center">
                              <Button
                                onClick={() => handleDeleteConfirmation(i)}
                              >
                                CANCEL
                              </Button>
                            </Flex>
                          </Td>
                        )}
                      {translations[i].status == 'Done' && (
                        <Td
                          fontSize={{ sm: '14px' }}
                          minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                          borderColor={borderColor}
                        >
                          <Flex align="center">
                            <Button
                              onClick={() =>
                                handleDownload(translations[i].uploadId.file)
                              }
                            >
                              Download
                            </Button>
                          </Flex>
                        </Td>
                      )}

                      {translations[i].status == 'Working' && (
                        <Td
                          fontSize={{ sm: '14px' }}
                          minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                          borderColor={borderColor}
                        >
                          <Flex align="center">
                            <Button
                              isLoading
                              loadingText="Translating"
                              colorScheme="teal"
                              variant="outline"
                            ></Button>
                          </Flex>
                        </Td>
                      )}
                      {translations[i].adminValidationStatus == 'Rejected' && (
                        <Td
                          fontSize={{ sm: '14px' }}
                          minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                          borderColor={borderColor}
                        >
                          <Flex align="center">
                            <Badge colorScheme="red">Rejected</Badge>
                          </Flex>
                        </Td>
                      )}
                      <AlertDialog
                        isOpen={isOpen[i]}
                        leastDestructiveRef={cancelRef}
                        onClose={() => onClose(i)}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Delete Confirmation
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure you want to delete?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button
                                ref={cancelRef}
                                onClick={() => onClose(i)}
                              >
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  onClose(i); // Close the dialog
                                  handleDeleteRequest(
                                    translations[i]._id,
                                    fileInfo._id,
                                  ); // Proceed with delete
                                }}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </>
                  )}
                </Tr>
              ))}
          </Tbody>
        </Table>
        <Text color={textColor} fontSize="sm" fontWeight="700">
          <strong style={{ color: 'red' }}>Note :</strong>
          <br />
          If you think your demand was rejected by mistake you can contact us,
          otherwise your demand will be deleted in the next 72 hours and you
          will have to make a new one.
        </Text>
      </Flex>
    </>
  );
}

export default SearchTable2;
