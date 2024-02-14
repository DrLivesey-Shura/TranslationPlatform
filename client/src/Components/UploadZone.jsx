import React, { useState } from "react";
import axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";
import { Box, Button, Input } from "@chakra-ui/react";

const UploadZone = ({ user, onUpload }) => {
  const [file, setFiles] = useState();

  const handleUpload = async () => {
    console.log(user);
    console.log(file);
    if (!file) {
      console.log("No file selected");
      return;
    }
    console.log(file.name);
    try {
      const response = await axios.post("/api/upload/", {
        photo: file.name,
        userId: user._id,
      });
      console.log("Upload successful:", response.data);
      onUpload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Box my="25px">
      <Input
        color="#FFFFFFCC"
        width="350px"
        variant="flushed"
        type="file"
        onChange={(e) => {
          setFiles(e.target.files[0]);
        }}
      />

      <Button
        _hover={{ bgColor: "none" }}
        bg="none"
        color="none"
        onClick={handleUpload}
      >
        <AiFillPlusCircle
          bg="none"
          size="45px"
          color="purple"
          _hover={{ bgColor: "#80008099" }}
          _active={{ bgColor: "none" }}
          _focus={{ bgColor: "none" }}
        />
      </Button>
    </Box>
  );
};

export default UploadZone;
