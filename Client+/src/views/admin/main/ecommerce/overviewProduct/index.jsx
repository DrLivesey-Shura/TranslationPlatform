// Chakra imports
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchTableOverview from 'views/admin/main/ecommerce/overviewProduct/components/SearchTableOverview';

export default function ProductOverview() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [userTranslations, setUserTranslations] = useState([]);
  const [fileInfo, setFileInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTranslationsResponse = await axios.get(
          `/translation-demands/user/${user._id}`,
        );

        const fileInfoRequests = userTranslationsResponse.data.map((dmnd) =>
          axios.get(`/upload/file/${dmnd.uploadId}`),
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
  const handleDelete = (deletedId) => {
    setUserTranslations(
      userTranslations.filter((item) => item._id !== deletedId),
    );
    // setFileInfo(fileInfo.filter((item) => item._id !== deletedId));
  };
  console.log(userTranslations);

  return (
    <Flex direction="column" pt={{ sm: '125px', lg: '75px' }}>
      {!isLoading && (
        <SearchTableOverview
          user={user}
          translations={userTranslations}
          fileInfo={fileInfo}
          onDelete={handleDelete}
        />
      )}
    </Flex>
  );
}
