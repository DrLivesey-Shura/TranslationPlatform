// Dashboard.jsx
import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import UploadZone from "../Components/UploadZone";

const Dashboard = () => {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      height="100vh"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem area={"header"}>
        <Navbar />
      </GridItem>
      <GridItem area={"main"}>
        <UploadZone />
      </GridItem>
      <GridItem area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
