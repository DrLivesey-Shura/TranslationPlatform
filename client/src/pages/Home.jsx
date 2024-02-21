// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useFile } from "../Context/FileContext";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminRequests from "./Admin/AdminRequests";
import UserDashboard from "./User/UserDashboard";
import UserRequests from "./User/UserRequests";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { userFiles, setUserFiles } = useFile();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState("home");
  const handleNavLinkClick = (page) => {
    setCurrentPage(page);
  };

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

  if (!user) {
    navigate("/login");
    return null;
  }

  let content;
  if (!user.isAdmin) {
    switch (currentPage) {
      case "home":
        content = (
          <UserDashboard
            user={user}
            userFiles={userFiles}
            onUpload={fetchFiles}
          />
        );
        break;
      case "requests":
        content = <UserRequests user={user} />;
        break;

      default:
        content = <div>Error: Page not found</div>;
    }
  } else {
    switch (currentPage) {
      case "home":
        content = <AdminDashboard />;
        break;
      case "requests":
        content = <AdminRequests user={user} />;
        break;

      default:
        content = <div>Error: Page not found</div>;
    }
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
        <Navbar user={user} onNavLinkClick={handleNavLinkClick} />
      </GridItem>
      <GridItem area={"main"}>{content}</GridItem>
      <GridItem area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Home;
