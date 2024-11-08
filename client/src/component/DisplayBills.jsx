import React, { useEffect, useState } from "react";
import { get, post } from "../services/ApiEndpoint";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    width: "118%",
    position: "relative",
    boxSizing: "border-box",
    top: "120%",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f0f4f8",
    marginTop: "3%",
    marginLeft: "1%",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  row: {
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  assignButton: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "9px",
    background: "#ffadad8f",
    color: "red",
    cursor: "pointer",
    marginTop: "3%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "25%",
  },
  closeButton: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const DisplayBills = () => {
  const [bills, setBills] = useState([]);
  const [salesman, setSalesman] = useState("");
  const [filteredBills, setFilteredBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedBills, setSelectedBills] = useState([]);
  const [company, setCompany] = useState("");
  const [salesmenList, setSalesmenList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await get("api/bills");
        setBills(response.data);
      } catch (error) {
        console.error("Error fetching bills", error);
      }
    };
    fetchBills();
  }, []);

  const handleCompanyChange = (e) => {
    const selectedCompany = e.target.value;
    setCompany(selectedCompany);

    const filteredSalesmen = bills
      .filter((bill) => bill.companyName === selectedCompany)
      .map((bill) => bill.salesmanName);

    setSalesmenList([...new Set(filteredSalesmen)]);
  };

  const handleSalesmanChange = (e) => {
    const selectedSalesman = e.target.value;
    setSalesman(selectedSalesman);

    const filtered = bills.filter(
      (bill) =>
        bill.salesmanName === selectedSalesman && bill.companyName === company
    );
    setFilteredBills(filtered);
  };

  const handleRowClick = (bill) => {
    setSelectedBill(bill);
  };

  const closePopup = () => {
    setSelectedBill(null);
  };

  const handleCheckboxChange = (bill) => {
    if (selectedBills.includes(bill)) {
      setSelectedBills(selectedBills.filter((b) => b !== bill));
    } else {
      setSelectedBills([...selectedBills, bill]);
    }
  };

  const handleAssignClick = async () => {
    try {
      const response = await post("/api/bills/assign", {
        selectedBills: selectedBills.map((bill) => bill._id),
        salesmanName: salesman,
        companyName: company,
      });
      alert(response.data.message);
      navigate("/admin/assignbills");
    } catch (error) {
      console.error("Error assigning bills:", error);
      alert("Error assigning bills");
    }
  };

  return (
    <div style={styles.container}>
      <label htmlFor="company">Select Company:</label>
      <select
        id="company"
        value={company}
        onChange={handleCompanyChange}
        style={styles.select}
      >
        <option value="">Select Company</option>
        {[...new Set(bills.map((bill) => bill.companyName))].map(
          (companyName, index) => (
            <option key={index} value={companyName}>
              {companyName}
            </option>
          )
        )}
      </select>
      <div style={{ marginLeft: "20%", position: "absolute", top: "7%" }}>
        <label htmlFor="salesman">Select Salesman:</label>
        <select
          id="salesman"
          value={salesman}
          onChange={handleSalesmanChange}
          style={styles.select}
          disabled={!company} // Disable the salesman dropdown if no company is selected
        >
          <option value="">Select Salesman</option>
          {salesmenList.map((salesmanName, index) => (
            <option key={index} value={salesmanName}>
              {salesmanName}
            </option>
          ))}
        </select>
      </div>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Outstanding Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBills.map((bill, index) => (
              <TableRow key={index} hover onClick={() => handleRowClick(bill)}>
                <TableCell>{bill.customerName}</TableCell>
                <TableCell>{bill.invoiceNumber}</TableCell>
                <TableCell>
                  {new Date(bill.invoiceDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{bill.totalAmount}</TableCell>
                <TableCell>{bill.outstandingAmount}</TableCell>
                <TableCell>{bill.status}</TableCell>

                <TableCell>
                  <Checkbox
                    checked={selectedBills.includes(bill)}
                    onChange={() => handleCheckboxChange(bill)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button style={styles.assignButton} onClick={handleAssignClick}>
        Assign
      </button>

      {selectedBill && (
        <Dialog open={true} onClose={closePopup}>
          <DialogTitle>Bill Details</DialogTitle>
          <DialogContent>
            <p>
              <strong>Customer Name:</strong> {selectedBill.customerName}
            </p>
            <p>
              <strong>Receipt Number:</strong> {selectedBill.receiptNumber}
            </p>
            <p>
              <strong>Invoice Number:</strong> {selectedBill.invoiceNumber}
            </p>
            <p>
              <strong>Due Amount:</strong> {selectedBill.dueAmount}
            </p>
            <p>
              <strong>Status:</strong> {selectedBill.status}
            </p>
            <p>
              <strong>Area:</strong> {selectedBill.area}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={closePopup} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default DisplayBills;
