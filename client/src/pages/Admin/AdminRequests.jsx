import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";

const AdminRequests = ({ user }) => {
  const [translations, setTranslations] = useState([]);
  const [uploaderInfo, setUploaderInfo] = useState({});

  const fetchUploaderInfo = async (uploadId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get(
        `/api/user/byupload/${uploadId}`,
        config
      );
      setUploaderInfo(response.data);
    } catch (error) {
      console.error("Error fetching uploader info:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const translationsResponse = await axios.get(
          "/api/translation-demands/"
        );
        setTranslations(translationsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRequest = async (translationId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/translation-demands/${translationId}`, config);

      // Update the state by removing the deleted translation
      setTranslations((prevTranslations) =>
        prevTranslations.filter((dmnd) => dmnd._id !== translationId)
      );
      console.log("Translation demand deleted successfully");
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

    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <>
      <MDBTable className="text-white" align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">File</th>
            <th scope="col">Language</th>
            <th scope="col">Estimated Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {translations.map((dmnd, index) => {
            // Call the fetchUploaderInfo function for each translation
            fetchUploaderInfo(dmnd.uploadId);

            return (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={uploaderInfo.pic}
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{uploaderInfo.name}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <p className="fw-bold mb-1">{dmnd.fileInfo?.photo}</p>
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
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default AdminRequests;
