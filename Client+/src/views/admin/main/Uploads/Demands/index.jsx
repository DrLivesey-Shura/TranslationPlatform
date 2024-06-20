// Chakra imports
import { Box, Flex, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchTableOverview from 'views/admin/main/Uploads/Demands/components/SearchTableOverview';
import Card from 'components/card/Card';

export default function UploadOverview() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [translations, setTranslations] = useState([]);
  const [file, setFile] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const translationsResponse = await axios.get(
        '/translation-demands/',
        config,
      );
      setTranslations(translationsResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (trDeletedId, fileDeletedId) => {
    setTranslations(translations.filter((item) => item._id !== trDeletedId));
    setFile(file.filter((item) => item._id !== fileDeletedId));
  };

  return (
    <Flex direction="column" pt={{ sm: '125px', lg: '75px' }}>
      <Card px="0px">
        {!isLoading ? (
          <SearchTableOverview
            user={user}
            translations={translations}
            onDelete={handleDelete}
            fetchData={fetchData}
          />
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
