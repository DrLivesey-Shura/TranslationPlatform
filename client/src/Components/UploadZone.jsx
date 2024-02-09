import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

const UploadZone = () => {
  const [file, setFiles] = useState();

  const handleUpload = () => {
    if (!file) {
      console.log("no file selected");
      return;
    }
    const fd = new FormData();
    fd.append("file", file);
    console.log(fd);
    console.log(file);
  };

  return (
    <div>
      <h1>Uploading files in react</h1>
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
