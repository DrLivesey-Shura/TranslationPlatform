import React, { useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import UploadZone from "../../Components/UploadZone";
import Gallery from "../../Components/Gallery";

const UserDashboard = ({ user, userFiles, onUpload }) => {
  const handleUpload = () => {
    onUpload();
  };

  return (
    <Box mx="24px" py="22px">
      <UploadZone user={user} onUpload={handleUpload} />
      <Gallery files={userFiles} onDelete={handleUpload} user={user} />
    </Box>
  );
};

export default UserDashboard;
