import React from "react";
import { Box } from "@chakra-ui/react";
import UploadZone from "../../Components/UploadZone";
import Gallery from "../../Components/Gallery";

const UserDashboard = ({ user, userFiles, onUpload }) => {
  const handleUpload = () => {
    onUpload();
  };

  return (
    <Box padding="20px">
      <UploadZone user={user} onUpload={handleUpload} />
      <Gallery files={userFiles} onDelete={handleUpload} user={user} />
    </Box>
  );
};

export default UserDashboard;
