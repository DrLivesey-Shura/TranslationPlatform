// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function ReceiptTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  const textColor = useColorModeValue("navy.700", "white");
  const borderColor = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
  return (
    <Flex
      direction='column'
      w='100%'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Table {...getTableProps()} variant='simple' color='gray.500'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Item") {
                    data = (
                      <Flex direction='column'>
                        <Text color={textColor} fontSize='md' fontWeight='700'>
                          {cell.value[0]}
                        </Text>
                        <Text
                          color='secondaryGray.600'
                          fontSize='md'
                          fontWeight='400'>
                          {cell.value[1]}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Quantity") {
                    data = (
                      <Text color={textColor} fontSize='md' fontWeight='500'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Rate") {
                    data = (
                      <Text color={textColor} fontSize='md' fontWeight='500'>
                        ${cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Amount") {
                    data = (
                      <Text color={textColor} fontSize='md' fontWeight='500'>
                        ${cell.value}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "170px", md: "200px", lg: "auto" }}
                      borderColor={borderColor}
                      mt='20px !important'
                      py='22px !important'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
}
