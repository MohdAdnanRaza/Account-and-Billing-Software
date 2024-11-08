import React from "react";

const PaymentSummaryTable = ({ salesmanPayments }) => {
  return (
    <div>
      <h3>Payment Summary</h3>
      {salesmanPayments.map((salesman, index) => (
        <div key={index}>
          <h4>{salesman.salesmanName || "Unknown Salesman"}</h4>
          <p>Cash Collected: ₹{salesman.paymentSummary.cash}</p>
          <p>UPI Collected: ₹{salesman.paymentSummary.upi}</p>
          <p>Cheque Collected: ₹{salesman.paymentSummary.cheque}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentSummaryTable;
