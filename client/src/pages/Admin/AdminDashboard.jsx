// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem, Spinner } from "@chakra-ui/react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import axios from "axios";
import AdminGallery from "../../Components/AdminGallery";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
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
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
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
    <Box
      display="flex"
      justifyContent="center"
      justifyItems="center"
      mx="24px"
      py="22px"
    >
      {loading ? (
        <Spinner
          mt="30px"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <AdminGallery files={files} onDelete={handleUpload} user={user} />
      )}
    </Box>
  );
};

export default AdminDashboard;
