// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import UploadZone from "../Components/UploadZone";
import Gallery from "../Components/Gallery";
import axios from "axios";
import { useFile } from "../Context/FileContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { userFiles, setUserFiles } = useFile();
  const navigate = useNavigate();

  const fetchFiles = () => {
    if (!user) {
      navigate("/login");
      return null;
    }
    axios
      .get(`/api/upload/${user._id}`)
      .then((res) => {
        setUserFiles(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchFiles();
  }, [user]);

  const handleUpload = () => {
    fetchFiles();
  };

  if (!user) {
    navigate("/login");
    return null;
  }
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
        <Gallery files={userFiles} onDelete={handleUpload} user={user} />
      </GridItem>
      <GridItem area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default UserDashboard;
