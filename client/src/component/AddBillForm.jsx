// components/AddBillForm.js
import React, { useState } from "react";
import axios from "axios";

const AddBillForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [dueAmount, setDueAmount] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBill = {
        customerName,
        receiptNumber,
        invoiceNumber,
        dueAmount,
        status,
      };
      await axios.post("/api/bills/add", newBill);

      alert("Bill added successfully!");
    } catch (error) {
      console.error("Error adding bill:", error);
    }
  };

  return (
    <div>
      <h2>Add New Bill</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </label>
        <label>
          Receipt Number:
          <input
            type="text"
            value={receiptNumber}
            onChange={(e) => setReceiptNumber(e.target.value)}
          />
        </label>
        <label>
          Invoice Number:
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </label>
        <label>
          Due Amount:
          <input
            type="number"
            value={dueAmount}
            onChange={(e) => setDueAmount(e.target.value)}
          />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </label>
        <button type="submit">Add Bill</button>
      </form>
    </div>
  );
};

export default AddBillForm;
