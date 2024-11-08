import React from "react";

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
  },
  thead: {
    backgroundColor: "#4caf50",
    color: "white",
  },
  th: {
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    fontWeight: "bold",
    backgroundColor: "#87CEFA",
  },
  td: {
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const BillTable = ({ bills, onOpenModal }) => (
  <table style={styles.table}>
    <thead style={styles.thead}>
      <tr>
        <th style={styles.th}>Customer Name</th>
        <th style={styles.th}>Invoice Number</th>
        <th style={styles.th}>Invoice Date</th>
        <th style={styles.th}>Total Amount</th>
        <th style={styles.th}>Outstanding Amount </th>
        {/* <th style={styles.th}>Status </th> */}
        <th style={styles.th}>Action</th>
      </tr>
    </thead>
    <tbody>
      {bills.map((bill) => (
        <tr key={bill._id}>
          <td style={styles.td}>{bill.customerName}</td>
          <td style={styles.td}>
            {new Date(bill.invoiceDate).toLocaleDateString()}
          </td>
          <td style={styles.td}>{bill.invoiceNumber}</td>
          <td style={styles.td}>{bill.totalAmount}</td>
          <td style={styles.td}>{bill.outstandingAmount}</td>
          {/* <td style={styles.td}>{bill.status}</td> */}

          <td style={styles.td}>
            <button style={styles.button} onClick={() => onOpenModal(bill)}>
              View & Add Payment
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BillTable;
