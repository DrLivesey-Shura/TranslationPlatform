import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import {
  Box,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import ImageModal from "../../Components/ImageModal";

const UserRequests = ({ user }) => {
  const [userTranslations, setUserTranslations] = useState([]);
  const [fileInfo, setFileInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTranslationId, setSelectedTranslationId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTranslationsResponse = await axios.get(
          `/api/translation-demands/user/${user._id}`
        );

        const fileInfoRequests = userTranslationsResponse.data.map((dmnd) =>
          axios.get(`/api/upload/file/${dmnd.uploadId}`)
        );

        const fileInfosResponses = await Promise.all(fileInfoRequests);
        const fileInfosData = fileInfosResponses.map(
          (response) => response.data
        );

        setUserTranslations(userTranslationsResponse.data);
        setFileInfo(fileInfosData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user._id, userTranslations]);

  const handleDeleteRequest = async (translationId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.delete(
        `/api/translation-demands/${translationId}`,
        config
      );

      if (response.status === 200) {
        const updatedUserTranslations = userTranslations.filter(
          (dmnd) => dmnd._id !== translationId
        );

        setUserTranslations(updatedUserTranslations);
        console.log("Translation demand deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting translation demand:", error);
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

    const formattedDate = new Date(dateString).toLocaleString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handlePayRequest = async (translationId) => {
    try {
      setSelectedTranslationId(translationId);
      setIsModalOpen(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      // Initiating payment
      const response1 = await axios.put(
        `/api/translation-demands/pay/${translationId}`,
        {
          validationStatus: "Pending",
          paymentStatus: "Paid",
          status: "Pending",
        },
        config
      );

      // Perform payment initiation logic (API call)
      const response = await axios.post(
        `/api/translation-demands/pay/${translationId}`,
        null,
        config
      );

      if (response.status === 200) {
        // Optionally, you can update the local state or show a success message
        console.log("Payment initiated successfully");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Handle errors or show error messages
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
      default:
        return "primary";
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedFile) {
        console.log("No file selected");
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.post(
        `/api/translation-demands/pay/proof/${selectedTranslationId}`,
        {
          paymentProof: selectedFile.name,
        },
        config
      );
      if (response.status === 200) {
        console.log("Payment proof uploaded successfully");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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
              <th scope="col">language</th>
              <th scope="col">Estimated Date</th>
              <th scope="col">Status</th>
              <th scope="col">Payment</th>
              <th scope="col">Admin Validation</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {userTranslations.map((dmnd, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={"https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_34.png"}
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user.name}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <p className="fw-bold mb-1">{fileInfo[index]?.photo}</p>
                  </div>
                </td>
                {/* <td>
                  <div>
                    <ImageModal
                      alt={dmnd.paymentProof}
                      smallImageUrl={`http://localhost:4000/uploads/${dmnd.paymentProof}`}
                      largeImageUrl={`http://localhost:4000/uploads/${dmnd.paymentProof}`}
                    />
                  </div>
                </td> */}
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
                  <MDBBtn
                    onClick={() => handleDeleteRequest(dmnd._id)}
                    color="link"
                    rounded
                    size="sm"
                  >
                    CANCEL
                  </MDBBtn>
                  {dmnd.paymentStatus == "Unpaid" ||
                  dmnd.adminValidationStatus == "Rejected" ? (
                    <MDBBtn
                      onClick={() => handlePayRequest(dmnd._id)}
                      color="link"
                      rounded
                      size="sm"
                    >
                      PAY
                    </MDBBtn>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Payment Receipt</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              type="file"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserRequests;
