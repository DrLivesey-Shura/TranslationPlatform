import {
  Avatar,
  Button,
  Flex,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import React, { useMemo } from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

function SearchTable2(users) {
  console.log(users.users);
  const columnsData = [
    'FULL NAME',
    'EMAIL',
    'PHONE',
    'JOIN DATE',
    'LANGUAGES',
    'ACTION',
  ];

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
            {users.users.map((user, i) => {
              return (
                <Tr key={i}>
                  <Td
                    fontSize={{ sm: '12px' }}
                    minW={{ sm: '120px', md: '150px', lg: 'auto' }}
                    borderColor={borderColor}
                  >
                    <Flex align="center">
                      <Text color={textColor} fontSize="md" fontWeight="500">
                        {user.name}
                      </Text>
                    </Flex>
                  </Td>
                  <Td
                    fontSize={{ sm: '12px' }}
                    minW={{ sm: '120px', md: '150px', lg: 'auto' }}
                    borderColor={borderColor}
                  >
                    <Flex align="center">
                      <Text color={textColor} fontSize="md" fontWeight="500">
                        {user.email}
                      </Text>
                    </Flex>
                  </Td>
                  <Td
                    fontSize={{ sm: '12px' }}
                    minW={{ sm: '120px', md: '150px', lg: 'auto' }}
                    borderColor={borderColor}
                  >
                    <Flex align="center">
                      <Text color={textColor} fontSize="md" fontWeight="500">
                        {user.phone}
                      </Text>
                    </Flex>
                  </Td>
                  <Td
                    fontSize={{ sm: '12px' }}
                    minW={{ sm: '120px', md: '150px', lg: 'auto' }}
                    borderColor={borderColor}
                  >
                    <Flex align="center">
                      <Text color={textColor} fontSize="md" fontWeight="500">
                        {new Date(user.createdAt).toLocaleString('en-US', {
                          timeZone: 'Europe/Paris',
                          dateStyle: 'full',
                          timeStyle: 'long',
                        })}
                      </Text>
                    </Flex>
                  </Td>
                  <Td
                    fontSize={{ sm: '12px' }}
                    minW={{ sm: '120px', md: '150px', lg: 'auto' }}
                    borderColor={borderColor}
                  >
                    <Flex align="center">
                      {user.languages.map((language, index) => (
                        <Text
                          key={index}
                          color={textColor}
                          fontSize="md"
                          fontWeight="500"
                          mr="5px"
                          mb="5px"
                          px="8px"
                          py="2px"
                          borderRadius="md"
                          bg="blue.100"
                          border="1px solid"
                          borderColor="blue.300"
                        >
                          {language}
                        </Text>
                      ))}
                    </Flex>
                  </Td>
                  <Td
                    fontSize={{ sm: '12px' }}
                    minW={{ sm: '120px', md: '150px', lg: 'auto' }}
                    borderColor={borderColor}
                  >
                    <Flex align="center">
                      <Button color={textColor} fontSize="md" fontWeight="500">
                        DELETE
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default SearchTable2;
