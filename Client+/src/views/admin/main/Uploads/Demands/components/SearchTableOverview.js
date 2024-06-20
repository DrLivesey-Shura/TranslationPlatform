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
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { CiSaveDown2 } from 'react-icons/ci';
import { FaCheckCircle } from 'react-icons/fa';
import { FaThumbsUp } from 'react-icons/fa';
import { FaThumbsDown } from 'react-icons/fa';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
function SearchTable2({ user, translations, onDelete, fetchData }) {
  const columnsData = [
    'File Name',
    'User Name',
    'Language',
    'Number of words',
    'Number of pages',
    'Status',
    'Payment',
    'Download',
    'Actions',
  ];

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const brandColor = useColorModeValue('brand.500', 'brand.400');
  const [transaltionId, setTransaltionId] = useState();
  const [userEmail, setUserEmail] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState(null);

  const handleModalOpen = (tr_Id, email) => {
    setTransaltionId(tr_Id);
    setUserEmail(email);
    onOpen();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    // Create a new file with the modified name
    const modifiedFileName = file.name.replace(/(\.[\w\d_-]+)$/i, '_tr$1');
    const modifiedFile = new File([file], modifiedFileName, {
      type: file.type,
    });

    const formData = new FormData();
    formData.append('file', modifiedFile);
    formData.append('userEmail', userEmail);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await axios.post(
        '/upload/translated-upload',
        formData,
        config,
      );
      handleRequestIsDone(transaltionId);
      onClose();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const response = await axios.get(`/upload/download/${filename}`, config, {
        responseType: 'blob', // Receive response as a Blob
      });
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

  const handleRequestIsDone = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.put(
        `/translation-demands/pay/${transaltionId}`,
        {
          status: 'Done',
        },
        config,
      );
      console.log(response.data);

      if (response.status === 200) {
        // Handle success, e.g., update state or perform additional actions
        console.log('Translation demand accepted and validated successfully');
      }
      fetchData();
    } catch (error) {
      console.error('Error refusing and validating translation demand:', error);
    }
  };

  const handleRefuseRequest = async (translationDemandId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.put(
        `/translation-demands/pay/${translationDemandId}`,
        {
          validationStatus: 'Rejected',
          paymentStatus: 'Unpaid',
          status: 'Pending',
        },
        config,
      );

      if (response.status === 200) {
        // Handle success, e.g., update state or perform additional actions
        console.log('Translation demand refused and validated successfully');
      }
      fetchData();
    } catch (error) {
      console.error('Error refusing and validating translation demand:', error);
    }
  };

  const handleAcceptPayRequest = async (translationDemandId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.put(
        `/translation-demands/pay/${translationDemandId}`,
        {
          validationStatus: 'Approved',
          paymentStatus: 'Paid',
          status: 'Working',
        },
        config,
      );

      if (response.status === 200) {
        // Handle success, e.g., update state or perform additional actions
        console.log('Translation demand accepted and validated successfully');
      }
      fetchData();
    } catch (error) {
      console.error(
        'Error accepting and validating translation demand:',
        error,
      );
    }
  };

  return (
    <>
      <Flex
        direction="column"
        w="100%"
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
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
            {translations &&
              translations.map((translation, i) => (
                <Tr key={i}>
                  <Td
                    fontSize={{ sm: '14px' }}
                    minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                    borderColor={borderColor}
                  >
                    <Flex align="center">
                      <Flex direction="column">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {translation.uploadId.file.split('.')[0]}{' '}
                        </Text>
                        <Text
                          color="secondaryGray.500"
                          fontSize="sm"
                          fontWeight="600"
                        >
                          {translation.uploadId.file.split('.')[1]}{' '}
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <>
                    {console.log('transaltion : ', translation)}
                    <Td
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor={borderColor}
                    >
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {translation.userId.name}
                        </Text>
                      </Flex>
                    </Td>
                    <Td
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor={borderColor}
                    >
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {translation.language}
                        </Text>
                      </Flex>
                    </Td>
                    <Td
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor={borderColor}
                    >
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {translation.uploadId.numWords}
                        </Text>
                      </Flex>
                    </Td>
                    <Td
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor={borderColor}
                    >
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {translation.uploadId.numPages}
                        </Text>
                      </Flex>
                    </Td>
                    {/* <Td
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor={borderColor}
                    >
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {new Date(translation.estimatedDate).toLocaleString(
                            'en-US',
                            {
                              dateStyle: 'full',
                              timeStyle: 'long',
                            },
                          )}
                        </Text>
                      </Flex>
                    </Td> */}
                    <Td
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor={borderColor}
                    >
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {translation.status}
                        </Text>
                      </Flex>
                    </Td>
                    <Td
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor={borderColor}
                    >
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {translation.paymentStatus}
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
                          variant="brand"
                          onClick={() =>
                            handleDownload(translation.uploadId.file)
                          }
                        >
                          <CiSaveDown2 style={{ fontSize: '27px' }} />
                        </Button>
                      </Flex>
                    </Td>

                    {translation.adminValidationStatus == 'Pending' && (
                      <Td
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor={borderColor}
                      >
                        <Flex align="center">
                          <Button
                            onClick={() => handleRefuseRequest(translation._id)}
                          >
                            <FaThumbsDown size="22px" color="red" />
                          </Button>
                        </Flex>
                        <Flex my="12px" align="center">
                          <Button
                            onClick={() =>
                              handleAcceptPayRequest(translation._id)
                            }
                          >
                            <FaThumbsUp color="green" size="22px" />
                          </Button>
                        </Flex>
                      </Td>
                    )}
                    {translation.status == 'Working' && (
                      <Td
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor={borderColor}
                      >
                        <Flex align="center">
                          <Button
                            my="8px"
                            onClick={() =>
                              handleModalOpen(
                                translation._id,
                                translation.userId.email,
                              )
                            }
                          >
                            <FaCheckCircle size="22px" />
                          </Button>
                        </Flex>
                      </Td>
                    )}

                    {translation.adminValidationStatus == 'Rejected' && (
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

                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Upload File</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <form onSubmit={handleFileUpload}>
                            <FormControl>
                              <FormLabel>Choose file</FormLabel>
                              <Input type="file" onChange={handleFileChange} />
                            </FormControl>
                          </form>
                        </ModalBody>
                        <ModalFooter>
                          <Button variant="ghost" onClick={onClose}>
                            Close
                          </Button>
                          <Button colorScheme="blue" onClick={handleFileUpload}>
                            Upload
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </>
                </Tr>
              ))}
          </Tbody>
        </Table>
        <Text mx="18px" color={textColor} fontSize="sm" fontWeight="700">
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
