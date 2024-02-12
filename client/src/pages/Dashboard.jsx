// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import UploadZone from "../Components/UploadZone";
import Gallery from "../Components/Gallery";
import axios from "axios";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const fetchFiles = () => {
    axios
      .get("/api/upload")
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = () => {
    fetchFiles();
  };

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      height="100vh"
      gap="1"
      fontWeight="bold"
    >
      <GridItem area={"header"}>
        <Navbar user={user} />
      </GridItem>
      <GridItem area={"main"}>
        <UploadZone user={user} onUpload={handleUpload} />
        <Gallery files={files} onDelete={handleUpload} user={user} />
      </GridItem>
      <GridItem area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
