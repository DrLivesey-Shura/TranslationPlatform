// Chakra imports
import { Box, Grid, Spinner, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Receipt from 'views/admin/main/Uploads/uploadDetails/components/Receipt';
import Details from 'views/admin/main/Uploads/uploadDetails/components/Details';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UploadDetails() {
  const { currentTranslationId } = useParams();
  const textColor = useColorModeValue('gray.700', 'white');
  const bgButton = 'rgba(255,255,255,0.12)';
  const bgHover = { bg: 'whiteAlpha.50' };
  const bgFocus = { bg: 'rgba(255,255,255,0.12)' };
  const [translation, setTranslation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const fetchTransaltionDemand = async () => {
    try {
      // const config = {
      //   headers: { Authorization: `Bearer ${user.token}` },
      // };
      const response = await axios.get(
        `/translation-demands/${currentTranslationId}`,
        // config,
      );
      console.log(response.data);
      setTranslation(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching translation demand:', error);
    }
  };

  useEffect(() => {
    fetchTransaltionDemand();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const userTranslationsResponse = await axios.get(
  //       `/translation-demands/${currentTranslationId}`,
  //     );
  //     console.log(userTranslationsResponse.data);
  //     setTranslation(userTranslationsResponse.data);
  //   } catch (error) {
  //     console.error('Error fetching translation:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [currentTranslationId]);

  return (
    <Box>
      <Grid
        mb="20px"
        templateColumns={{ base: '2.4fr 1fr', lg: '2.4fr 1fr' }}
        direction="column"
        pt={{ base: '130px', md: '80px', xl: '80px' }}
      >
        {!isLoading ? (
          <Receipt
            me="20px"
            gridArea={{ base: '1 / 1 / 2 / 3', lg: '1 / 1 / 2 / 2' }}
            ref={componentRef}
            handlePrint={handlePrint}
            textColor={textColor}
            bgButton={bgButton}
            bgHover={bgHover}
            bgFocus={bgFocus}
            translation={translation}
            file={translation.uploadId}
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
      </Grid>
      <Details />
    </Box>
  );
}
