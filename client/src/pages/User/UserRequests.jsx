import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Box, Spinner } from "@chakra-ui/react";

const UserRequests = ({ user }) => {
  const [userTranslations, setUserTranslations] = useState([]);
  const [fileInfo, setFileInfo] = useState({});
  const [loading, setLoading] = useState(true);

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
                      src={user.pic}
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
    </Box>
  );
};

export default UserRequests;
