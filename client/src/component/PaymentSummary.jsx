import React from "react";

const PaymentSummary = ({ cash, cheque, upi }) => {
  return (
    <div
      style={{ padding: "2px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h3>Payment Summary</h3>
      <p>Cash Collected: ₹{cash}</p>
      <p>Cheque Collected: ₹{cheque}</p>
      <p>UPI Collected: ₹{upi}</p>
      <h4>Total Collection: ₹{cash + cheque + upi}</h4>
    </div>
  );
};

export default PaymentSummary;
