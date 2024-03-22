// Chakra imports
import { Flex } from '@chakra-ui/react';
import Card from 'components/card/Card';
import React from 'react';
import SearchTableOrders from 'views/admin/main/ecommerce/orderList/components/SearchTableOrders';
import { columnsDataOrders } from 'views/admin/main/ecommerce/orderList/variable/columnsDataOrders';
import tableDataOrders from 'views/admin/main/ecommerce/orderList/variable/tableDataOrders.json';

export default function SearchUser() {
  return (
    <Flex direction="column" pt={{ sm: '125px', lg: '75px' }}>
      <Card px="0px">
        <SearchTableOrders
          tableData={tableDataOrders}
          columnsData={columnsDataOrders}
        />
      </Card>
    </Flex>
  );
}
