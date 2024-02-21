import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";

const UserRequests = ({ user }) => {
  const [userTranslations, setUserTranslations] = useState([]);
  const [fileInfo, setFileInfo] = useState({});

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
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user._id]);

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

  return (
    <>
      <MDBTable className="text-white" align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">File</th>
            <th scope="col">language</th>
            <th scope="col">Estimated Date</th>
            <th scope="col">Status</th>
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
                <MDBBadge color="success" pill>
                  {dmnd.status}
                </MDBBadge>
              </td>
              <td>
                <MDBBtn
                  onClick={() => handleDeleteRequest(dmnd._id)}
                  color="link"
                  rounded
                  size="sm"
                >
                  DELETE
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default UserRequests;
