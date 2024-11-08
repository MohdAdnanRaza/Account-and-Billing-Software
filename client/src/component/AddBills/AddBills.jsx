import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiImport } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import UploadExcel from "../UploadExcel";
import { Modal, Box } from "@mui/material";
import DisplayBills from "../DisplayBills";
import { post } from "../../services/ApiEndpoint";
import AddBillPage from "../AddBillPage";
const AddBills = () => {
  const [billData, setBillData] = useState({
    customerName: "",
    receiptNumber: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueAmount: "",
    status: "",
    area: "",
  });
  const navigate = useNavigate();
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state to control modal visibility for import button
  const [open, setOpen] = useState(false);
  const openModall = () => {
    setOpen(true);
  };
  const closeModall = () => {
    setOpen(false);
  };
  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);
  const handleChange = (e) => {
    setBillData({
      ...billData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission (you can replace this with your logic)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await post("/api/bills/addnew", billData); // Make sure your backend route matches this

      // After successfully saving, close the modal and navigate to Add Bill page
      closeModal();
      navigate("/admin/addbills"); // Redirect to Add Bills page to view the added bill
    } catch (error) {
      console.error("Error saving bill:", error);
      alert("Error submitting the bill");
    }
  };

  return (
    <div>
      <div style={{ position: "absolute", bottom: "78%", left: "50%" }}></div>
      <div
        style={{
          width: "16%",
          height: "10px",
          paddingTop: "1%",
          paddingBottom: "2%",
          paddingLeft: "2%",
          fontSize: "20px",
          marginLeft: "18%",
          position: "absolute",
          bottom: "77%",
          left: "2%",
        }}
      ></div>
      <div>
        <button
          style={{
            paddingLeft: "1%",
            backgroundColor: "#009688",
            width: "13%",
            height: "10px",
            paddingTop: "1%",
            paddingBottom: "3%",
            fontSize: "20px",
            marginLeft: "30%",
            position: "absolute",
            bottom: "77%",
            left: "55%",
          }}
          onClick={openModal}
        >
          <IoIosAddCircle />
          Add New Bills
        </button>
      </div>
      <div>
        <button
          style={{
            backgroundColor: "#009688",
            width: "13%",
            height: "10px",
            paddingTop: "1%",
            paddingBottom: "3%",
            fontSize: "20px",
            marginLeft: "30%",
            position: "absolute",
            bottom: "77%",
            left: "40%",
          }}
          onClick={openModall}
        >
          <CiImport /> Import
        </button>
      </div>
      <Modal
        open={open}
        onClose={closeModall}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "40%",
            left: "55%",
            width: "7%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <UploadExcel closeModall={closeModal} />
        </Box>
      </Modal>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "23%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "35px",
            paddingBottom: "20px",
            marginTop: "11%",
            marginBottom: "50%",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            width: "850px",
            height: "500px",
            borderRadius: "8px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              position: "absolute",
              top: "1%",
            }}
          >
            Create Receipt
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div
              style={{ marginBottom: "10px", width: "40%", marginTop: "4%" }}
            >
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={billData.companyName}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div
              style={{
                marginBottom: "10px",
                position: "absolute",
                width: "37%",
                left: "50%",
                top: "6%",
                marginTop: "4%",
              }}
            >
              <label>Salesman Name</label>
              <input
                type="text"
                name="salesmanName"
                value={billData.salesmanName}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div
              style={{
                marginBottom: "10px",
                position: "absolute",
                width: "37%",
                left: "50%",
                top: "20%",
                marginTop: "4%",
              }}
            >
              <label>Invoice Number</label>
              <input
                type="text"
                name="invoiceNumber"
                value={billData.invoiceNumber}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div
              style={{
                marginBottom: "10px",
                position: "absolute",
                width: "77%",
                left: "8%",
                top: "33%",
                marginTop: "4%",
              }}
            >
              <label>Invoice Date</label>
              <input
                type="date"
                name="invoiceDate"
                value={billData.invoiceDate}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={billData.customerName}
                onChange={handleChange}
                required
                style={{
                  //width: "100%",
                  padding: "8px",
                  position: "absolute",
                  width: "37%",
                  left: "4%",
                  top: "25%",
                  marginTop: "4%",
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "10px",
                position: "absolute",
                width: "37%",
                left: "4%",
                top: "48%",
                marginTop: "4%",
              }}
            >
              <label>Total Amount</label>
              <input
                type="number"
                name="totalAmount"
                value={billData.totalAmount}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div
              style={{
                marginBottom: "10px",
                position: "absolute",
                width: "37%",
                left: "50%",
                top: "48%",
                marginTop: "4%",
              }}
            >
              <label>Outstanding Amount</label>
              <input
                type="number"
                name="outstandingAmount"
                value={billData.outstandingAmount}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30%",
              }}
            >
              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#009688",
                  width: "30%",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>

              {/* Close Modal Button */}
              <button
                type="button"
                onClick={closeModal}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "30%",
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Overlay */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={closeModal}
        />
      )}
      <div>
        <AddBillPage />
      </div>
    </div>
  );
};

export default AddBills;
