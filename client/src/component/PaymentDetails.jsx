// PaymentDetails.js
import React from "react";

const PaymentDetails = ({ payment }) => {
  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h3>Payment Details</h3>
      <p>Invoice Number: {payment.invoiceNumber}</p>
      <p>Invoice Date: {new Date(payment.invoiceDate).toLocaleDateString()}</p>
      <p>Mode of Payment: {payment.paymentMode}</p>

      {payment.paymentMode === "upi" && (
        <>
          <p>UPI Transaction Screenshot:</p>
          <img
            src={payment.proof}
            alt="UPI Screenshot"
            style={{ maxWidth: "100%" }}
          />
        </>
      )}

      {payment.paymentMode === "cheque" && (
        <>
          <p>Cheque Photo:</p>
          <img
            src={payment.proof}
            alt="Cheque Photo"
            style={{ maxWidth: "100%" }}
          />
        </>
      )}

      <p>Deposit Fields:</p>
      <p>Cash: ₹{payment.cash}</p>
      <p>Cheque: ₹{payment.cheque}</p>
      <p>UPI: ₹{payment.upi}</p>
      <h4>Total Deposit: ₹{payment.cash + payment.cheque + payment.upi}</h4>
    </div>
  );
};

export default PaymentDetails;
