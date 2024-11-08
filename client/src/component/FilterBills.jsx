import React, { useState, useEffect } from "react";
import { get } from "../services/ApiEndpoint";

const FilterBills = () => {
  const [bills, setBills] = useState([]);
  const [company, setCompany] = useState("");
  const [dateRange, setDateRange] = useState("0-7");
  const [grandTotal, setGrandTotal] = useState(0);

  // Fetch bills whenever company or date range changes
  useEffect(() => {
    const fetchBills = async () => {
      try {
        console.log("Fetching bills with dateRange:", dateRange);
        const response = await get("/api/bills/filter", {
          params: { companyName: company, dateRange },
        });
        setBills(response.data.bills);
        setGrandTotal(response.data.grandTotal);
      } catch (error) {
        console.error("Error fetching bills", error);
      }
    };

    fetchBills();
  }, [company, dateRange]);

  return (
    <div>
      <h1>Filtered Bills</h1>

      {/* Company Filter */}
      <div>
        <label>Select Company:</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter company name"
        />
      </div>

      {/* Date Range Filter */}
      <div>
        <label>Select Date Range:</label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="0-7">0-7 Days</option>
          <option value="8-14">8-14 Days</option>
          <option value="15-21">15-21 Days</option>
          <option value="22-28">22-28 Days</option>
        </select>
      </div>

      {/* Bills Table */}
      <table>
        <thead>
          <tr>
            <th>Salesman Name</th>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>Total Amount</th>
            <th>Deposit Amount</th>
            <th>Due Amount</th>
            <th>Area</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              <td>{bill.salesmanName}</td>
              <td>{bill.invoiceNumber}</td>
              <td>{new Date(bill.invoiceDate).toLocaleDateString()}</td>
              <td>{bill.totalAmount}</td>
              <td>{bill.depositAmount}</td>
              <td>{bill.dueAmount}</td>
              <td>{bill.area}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Grand Total */}
      <div>
        <h2>Grand Total: {grandTotal}</h2>
      </div>
    </div>
  );
};

export default FilterBills;
