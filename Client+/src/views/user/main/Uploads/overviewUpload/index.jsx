// Chakra imports
import { Box, Flex, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchTableOverview from 'views/user/main/Uploads/overviewUpload/components/SearchTableOverview';

export default function UploadOverview() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [userTranslations, setUserTranslations] = useState([]);
  const [fileInfo, setFileInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTranslationsResponse = await axios.get(
          `/translation-demands/user/${user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );

        const fileInfoRequests = userTranslationsResponse.data.map((dmnd) =>
          axios.get(`/upload/file/${dmnd.uploadId._id}`),
        );

        const fileInfosResponses = await Promise.all(fileInfoRequests);
        const fileInfosData = fileInfosResponses.map(
          (response) => response.data,
        );

        setUserTranslations(userTranslationsResponse.data);
        setFileInfo(fileInfosData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user._id]);

  // Function to update userTranslations after deletion
  const handleDelete = (trDeletedId, fileDeletedId) => {
    setUserTranslations(
      userTranslations.filter((item) => item._id !== trDeletedId),
    );
    setFileInfo(fileInfo.filter((item) => item._id !== fileDeletedId));
  };

  return (
    <Flex direction="column" pt={{ sm: '125px', lg: '75px' }}>
      {!isLoading ? (
        <SearchTableOverview
          user={user}
          translations={userTranslations}
          fileInfo={fileInfo}
          onDelete={handleDelete}
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
    </Flex>
  );
}
