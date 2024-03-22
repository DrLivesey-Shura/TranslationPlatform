// Chakra imports
import { Box, Input, useColorModeValue } from '@chakra-ui/react';
// Assets
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dropzone({ content, onUploadStateChanged, onUploadSuccess, ...rest }) {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const borderColor = useColorModeValue('gray.300', 'whiteAlpha.100');
  const [file, setFiles] = useState();
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const handleUpload = async () => {
    if (!file) {
      console.log('No file selected');
      return;
    }
    try {
      onUploadStateChanged(true);

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.post(
        '/upload/',
        {
          photo: file.name,
          userId: user._id,
        },
        config,
      );
      console.log('Upload successful:', response.data);
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      onUploadStateChanged(false);
    }
  };

  useEffect(() => {
    handleUpload(); // Trigger handleUpload when file changes
  }, [file]);

  return (
    <>
      <Box borderColor={borderColor} my="25px">
        <Input
          color={textColor}
          width="350px"
          type="file"
          variant="flushed"
          onChange={(e) => {
            setFiles(e.target.files[0]);
          }}
        />
      </Box>
    </>
  );
}

export default Dropzone;
