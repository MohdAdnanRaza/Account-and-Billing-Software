import React, { useState } from "react";
import axios from "axios";
import { Typography, Box, Input, Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledInput = styled(Input)({
  marginTop: "10px",
  border: "1px solid #ccc",
  padding: "8px",
  borderRadius: "4px",
  width: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "20px",
  backgroundColor: "#1976d2",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
});

const UploadExcel = ({ closeModall }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/bills/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Error uploading file");
    }
  };

  return (
    <Box
      style={{
        position: "absolute",
        top: "250%",
        left: "50%",
        width: "250%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Upload Excel File
      </Typography>
      <StyledInput
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        disableUnderline
      />
      <StyledButton variant="contained" onClick={handleUpload} disabled={!file}>
        Upload
      </StyledButton>

      {/* Close button */}
      <button
        type="button"
        onClick={closeModall}
        style={{
          padding: "10px 15px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Close
      </button>
    </Box>
  );
};

export default UploadExcel;
