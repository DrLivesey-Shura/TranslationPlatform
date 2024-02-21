// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import axios from "axios";
import AdminGallery from "../../Components/AdminGallery";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [files, setFiles] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const fetchFiles = () => {
    if (!user) {
      navigate("/login");
      return null;
    }
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    axios
      .get("/api/upload", config)
      .then((res) => {
        setFiles(res.data);
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
    <Box padding="20px">
      <AdminGallery files={files} onDelete={handleUpload} user={user} />
    </Box>
  );
};

export default AdminDashboard;
