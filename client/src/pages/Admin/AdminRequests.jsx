import React, { useEffect, useRef, useState } from "react";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBBtn,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Box, Spinner } from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

const AdminRequests = ({ user }) => {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [dmndId, setDmndId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModalOpen = (dmndId, email) => {
    setDmndId(dmndId);
    setUserEmail(email);
    onOpen();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    // Create a new file with the modified name
    const modifiedFileName = file.name.replace(/(\.[\w\d_-]+)$/i, "_tr$1");
    const modifiedFile = new File([file], modifiedFileName, {
      type: file.type,
    });

    const formData = new FormData();
    formData.append("file", modifiedFile);
    formData.append("userEmail", userEmail);

    try {
      const response = await axios.post(
        "/api/upload/translated-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleRequestIsDone(dmndId);
      onClose();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`/api/upload/download/${filename}`, {
        responseType: "blob", // Receive response as a Blob
      });
      console.log(response);
      // Create a temporary anchor element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Set the filename
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const translationsResponse = await axios.get(
          "/api/translation-demands/"
        );
        setTranslations(translationsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user, translations]);

  const handleRequestIsDone = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.put(
        `/api/translation-demands/pay/${dmndId}`,
        {
          status: "Done",
        },
        config
      );
      console.log(response.data);

      if (response.status === 200) {
        // Handle success, e.g., update state or perform additional actions
        console.log("Translation demand accepted and validated successfully");
      }
    } catch (error) {
      console.error("Error refusing and validating translation demand:", error);
    }
  };

  const handleRefuseRequest = async (translationDemandId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.put(
        `/api/translation-demands/pay/${translationDemandId}`,
        {
          validationStatus: "Rejected",
          paymentStatus: "Unpaid",
          status: "Pending",
        },
        config
      );

      if (response.status === 200) {
        // Handle success, e.g., update state or perform additional actions
        console.log("Translation demand refused and validated successfully");
      }
    } catch (error) {
      console.error("Error refusing and validating translation demand:", error);
    }
  };

  const handleAcceptPayRequest = async (translationDemandId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.put(
        `/api/translation-demands/pay/${translationDemandId}`,
        {
          validationStatus: "Approved",
          paymentStatus: "Paid",
          status: "Working",
        },
        config
      );

      if (response.status === 200) {
        // Handle success, e.g., update state or perform additional actions
        console.log("Translation demand accepted and validated successfully");
      }
    } catch (error) {
      console.error(
        "Error accepting and validating translation demand:",
        error
      );
    }
  };

  const getButtonColor = (status) => {
    switch (status) {
      case "Pending":
        return "primary";
      case "Approved":
        return "success";
      case "Done":
        return "success";
      case "Rejected":
        return "danger";
      case "Unpaid":
        return "danger";
      case "Paid":
        return "success";
      case "Working":
        return "primary";
      default:
        return "primary";
    }
  };

  const formatEstimatedDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Date(dateString).toLocaleString(undefined, options);
  };

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
        <MDBTable className="text-white" align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">File</th>
              <th scope="col">Language</th>
              <th scope="col">Estimated Date</th>
              <th scope="col">Status</th>
              <th scope="col">Payment</th>
              <th scope="col">Admin Validation</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {translations.map((dmnd, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_34.png"
                        }
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{dmnd.userId.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="fw-bold mb-1">{dmnd.uploadId.file}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="fw-bold mb-1">{dmnd.language}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="fw-bold mb-1">
                        {formatEstimatedDate(dmnd.estimatedDate)}
                      </p>
                    </div>
                  </td>
                  <td>
                    <MDBBadge color={getButtonColor(dmnd.status)} pill>
                      {dmnd.status}
                    </MDBBadge>
                  </td>
                  <td>
                    <MDBBadge color={getButtonColor(dmnd.paymentStatus)} pill>
                      {dmnd.paymentStatus}
                    </MDBBadge>
                  </td>
                  <td>
                    <MDBBadge
                      color={getButtonColor(dmnd.adminValidationStatus)}
                      pill
                    >
                      {dmnd.adminValidationStatus}
                    </MDBBadge>
                  </td>
                  <td>
                    {dmnd.adminValidationStatus == "Pending" ? (
                      <>
                        <MDBBtn
                          onClick={() => handleRefuseRequest(dmnd._id)}
                          color="link"
                          rounded
                          size="sm"
                        >
                          REFUSED
                        </MDBBtn>
                        <MDBBtn
                          onClick={() => handleAcceptPayRequest(dmnd._id)}
                          color="link"
                          rounded
                          size="sm"
                        >
                          ACCEPTED
                        </MDBBtn>
                      </>
                    ) : dmnd.status == "Working" ? (
                      <>
                        {" "}
                        <MDBBtn
                          onClick={() => handleDownload(dmnd.uploadId.file)}
                          color="link"
                          rounded
                          size="sm"
                        >
                          Download
                        </MDBBtn>
                        <MDBBtn
                          onClick={() =>
                            handleModalOpen(dmnd._id, dmnd.userId.email)
                          }
                          color="link"
                          rounded
                          size="sm"
                        >
                          DONE
                        </MDBBtn>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleFileUpload}>
              <FormControl>
                <FormLabel>Choose file</FormLabel>
                <Input type="file" onChange={handleFileChange} />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleFileUpload}>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminRequests;
