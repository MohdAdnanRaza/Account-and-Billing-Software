import React from "react";

const DetailedCollection = ({ bills = [] }) => {
  return (
    <div style={{ marginTop: "20px", padding: "20px", background: "#f4f4f4" }}>
      <h2>Detailed Collection</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>Mode of Payment</th>
            <th>Amount</th>
            <th>Proof</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              <td>{bill.invoiceNumber}</td>
              <td>{bill.invoiceDate}</td>
              <td>{bill.paymentApproval?.paymentMode}</td>
              <td>₹{bill.paymentApproval?.amount}</td>
              <td>
                {bill.paymentApproval?.paymentMode === "upi" &&
                  bill.paymentApproval?.proof && (
                    <a
                      href={bill.paymentApproval.proof}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View UPI Screenshot
                    </a>
                  )}
                {bill.paymentApproval?.paymentMode === "cheque" &&
                  bill.paymentApproval?.proof && (
                    <a
                      href={bill.paymentApproval.proof}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Cheque Photo
                    </a>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DetailedCollection;
