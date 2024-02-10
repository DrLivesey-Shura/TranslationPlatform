import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const UploadZone = () => {
  const [file, setFiles] = useState();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleUpload = async () => {
    console.log(user);
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
      console.log(response);
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h1>Uploading files in React</h1>
      <input
        type="file"
        onChange={(e) => {
          setFiles(e.target.files[0]);
        }}
      />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default UploadZone;
