import React, { useState } from "react";
import Modal from "react-modal";
import { post } from "../services/ApiEndpoint";

const styles = {
  modal: {
    width: "400px",
    margin: "50px auto",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    marginTop: "20px",
    marginBottom: "1px",
    marginLeft: "4px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const PaymentModal = ({
  isOpen,
  bill,
  paymentMode,
  setPaymentMode,
  amount,
  setAmount,
  proof,
  setProof,
  handleFileUpload,
  chequeNumber,
  chequeDate,
  setChequeDate,
  setChequeNumber,
  upiTransactionId,
  setUpiTransactionId,
  handlePayment,
  closeModal,
}) => {
  const onSubmit = async () => {
    console.log("Cheque Date: ", chequeDate);
    if (!paymentMode) {
      alert("Please select a payment mode.");
      return;
    }

    if (paymentMode === "cash" && !amount) {
      alert("Please enter the amount.");
      return;
    }

    // if (paymentMode === "cheque" && !chequeNumber) {
    //   alert("Please enter the cheque number.");
    //   return;
    // }

    // if (paymentMode === "upi" && !upiTransactionId) {
    //   alert("Please enter the UPI transaction ID.");
    //   return;
    // }
    if (paymentMode === "cheque") {
      if (!chequeNumber) {
        alert("Please enter the cheque number.");
        return;
      }
      if (!chequeDate) {
        alert("Please enter the cheque date.");
        return;
      }
    }

    if (paymentMode === "upi") {
      if (!upiTransactionId) {
        alert("Please enter the UPI transaction ID.");
        return;
      }
      if (!proof) {
        alert("Please upload the UPI transaction screenshot.");
        return;
      }
    }
    const paymentData = {
      billId: bill._id, // Assuming `bill._id` holds the bill ID
      paymentMode,
      amount,
      proof, // Add file proof if needed
      chequeNumber,
      chequeDate,
      upiTransactionId,
    };
    console.log(paymentData);
    try {
      // Call the API to submit payment for approval using Axios
      const response = await post(
        "/api/bills/requestPaymentApproval",
        paymentData
      );

      if (response.status === 200) {
        alert("Payment submitted successfully for approval!");
        handlePayment(); // Refresh the pending payments
        closeModal(); // Close the modal after successful submission
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("Failed to submit payment. Please try again.");
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        content: styles.modal,
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
      }}
    >
      <h2 style={{ backgroundColor: "#DEB887" }}>
        Payment for {bill?.customerName}
      </h2>
      <p style={{ fontSize: "30px" }}>Due Amount: ₹{bill?.Amount}</p>

      <label style={{ fontSize: "20px" }}>
        Payment Mode:
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option value="">Select Payment Mode</option>
          <option value="cash">Cash</option>
          <option value="cheque">Cheque</option>
          <option value="upi">UPI</option>
        </select>
      </label>

      {paymentMode === "cash" && (
        <>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            Upload Proof:
            <input type="file" onChange={handleFileUpload} />
          </label>
        </>
      )}

      {paymentMode === "cheque" && (
        <>
          {" "}
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            Cheque Number:
            <input
              type="text"
              value={chequeNumber}
              onChange={(e) => setChequeNumber(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            Cheque Date:
            <input
              type="date"
              value={chequeDate}
              onChange={(e) => {
                console.log(e.target.value); // This should log the selected date
                setChequeDate(e.target.value);
              }}
              style={styles.input}
            />
          </label>
          <label>
            Upload Cheque Photo:
            <input type="file" onChange={handleFileUpload} />
          </label>
        </>
      )}

      {paymentMode === "upi" && (
        <>
          {" "}
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            UPI Transaction ID:
            <input
              type="text"
              value={upiTransactionId}
              onChange={(e) => setUpiTransactionId(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            Upload UPI Screenshot:
            <input
              type="file"
              onChange={(e) => {
                setProof(e.target.files[0]); // Save proof file
                handleFileUpload(e);
              }}
            />
          </label>
        </>
      )}

      <button style={styles.button} onClick={onSubmit}>
        Submit Payment
      </button>
      <button
        style={{ ...styles.button, backgroundColor: "#f44336" }}
        onClick={closeModal}
      >
        Cancel
      </button>
    </Modal>
  );
};
export default PaymentModal;
