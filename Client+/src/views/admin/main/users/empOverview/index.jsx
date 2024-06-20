// Chakra imports
import { Box, Flex, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import Card from 'components/card/Card';
import React, { useEffect, useState } from 'react';
import SearchTableUsers from 'views/admin/main/users/empOverview/components/SearchTableUsersOverivew';

export default function UsersOverview() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const response = await axios.get('/employee/', config);
        setUsers(response.data.employes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user._id]);

  return (
    <Flex
      direction="column"
      my={{ sm: '15px', lg: '25px' }}
      pt={{ sm: '125px', lg: '75px' }}
    >
      <Card px="0px">
        {!isLoading ? (
          <SearchTableUsers users={users} />
        ) : (
          <Box display="flex" justifyContent="center" mt="20">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        )}
      </Card>
    </Flex>
  );
}
