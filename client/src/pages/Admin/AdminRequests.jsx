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

const AdminRequests = ({ user }) => {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleRequestIsDone = async (translationDemandId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const response = await axios.put(
        `/api/translation-demands/pay/${translationDemandId}`,
        {
          status: "Done",
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
                        src={dmnd.userId.pic}
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
                      <p className="fw-bold mb-1">{dmnd.uploadId.photo}</p>
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
                    ) : (
                      <MDBBtn
                        onClick={() => handleRequestIsDone(dmnd._id)}
                        color="link"
                        rounded
                        size="sm"
                      >
                        DONE
                      </MDBBtn>
                    )}
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      )}
    </Box>
  );
};

export default AdminRequests;
