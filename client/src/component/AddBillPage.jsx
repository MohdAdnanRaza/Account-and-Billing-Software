import React, { useState, useEffect } from "react";
import { get, put, deleteUser } from "../services/ApiEndpoint";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Paper,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
const FilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "20px",
  alignItems: "center",
}));

const AddBillPage = () => {
  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState({
    companyName: "",
    salesmanName: "",
    customerName: "",
    invoiceNumber: "",
    invoiceDate: "",
    status: "",
    totalAmount: "",
    outstandingAmount: "",
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(true);
  // Fetch bills from backend when the component is mounted
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await get("/api/bills");
        setBills(response.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  // Handle filtering
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };
  const handleResetFilters = () => {
    setFilter({
      companyName: "",
      salesmanName: "",
      customerName: "",
      invoiceNumber: "",
      invoiceDateFrom: "",
      invoiceDateTo: "",
      status: "",
      totalAmount: "",
      outstandingAmount: "",
    });
  };
  // Filter bills based on filter state
  const filteredBills = bills.filter((bill) => {
    return (
      bill.companyName
        .toLowerCase()
        .includes(filter.companyName.toLowerCase()) &&
      bill.salesmanName
        .toLowerCase()
        .includes(filter.salesmanName.toLowerCase()) &&
      bill.customerName
        .toLowerCase()
        .includes(filter.customerName.toLowerCase()) &&
      bill.invoiceNumber
        .toLowerCase()
        .includes(filter.invoiceNumber.toLowerCase()) &&
      (filter.invoiceDate === "" ||
        new Date(bill.invoiceDate).toLocaleDateString() ===
          new Date(filter.invoiceDate).toLocaleDateString()) &&
      (filter.status === "" || bill.status === filter.status) &&
      (filter.totalAmount === "" ||
        parseFloat(bill.totalAmount) >= parseFloat(filter.totalAmount)) &&
      (filter.outstandingAmount === "" ||
        parseFloat(bill.outstandingAmount) >=
          parseFloat(filter.outstandingAmount))
    );
  });

  const handleEditClick = (bill) => {
    setCurrentBill(bill);
    setEditModalOpen(true);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setCurrentBill({
      ...currentBill,
      [name]: value,
    });
  };

  const handleEditSave = async () => {
    try {
      const response = await put(
        `/api/bills/edit/${currentBill._id}`,
        currentBill
      );
      console.log("Bill updated:", response.data);
      toast.success("Bill updated successfully");
      setBills((prev) =>
        prev.map((bill) =>
          bill._id === currentBill._id ? response.data : bill
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating bill:", error);
      toast.error("Failed to update bill");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(`/api/bills/delete/${id}`);
      console.log("Bill deleted:", id);
      toast.success("Deleted successfully");
      setBills((prev) => prev.filter((bill) => bill._id !== id));
    } catch (error) {
      console.error("Error deleting bill:", error);
      toast.error("Failed to delete bill");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        width: "77%",
        position: "absolute",
        top: "18%",
        left: "20%",
      }}
    >
      <h1>Sales Invoice</h1>
      <Button
        onClick={() => setFiltersOpen(!filtersOpen)}
        startIcon={filtersOpen ? <ExpandLess /> : <ExpandMore />}
        style={{ marginBottom: "10px" }}
      >
        {filtersOpen ? "Hide Filters" : "Show Filters"}
      </Button>
      <Collapse in={filtersOpen}>
        <FilterContainer>
          <TextField
            label="Company Name"
            name="companyName"
            variant="outlined"
            size="small"
            onChange={handleFilterChange}
            value={filter.companyName}
          />
          <TextField
            label="Salesman Name"
            name="salesmanName"
            variant="outlined"
            size="small"
            onChange={handleFilterChange}
            value={filter.salesmanName}
          />
          <TextField
            label="Customer Name"
            name="customerName"
            variant="outlined"
            size="small"
            onChange={handleFilterChange}
            value={filter.customerName}
          />
          <TextField
            label="Invoice Number"
            name="invoiceNumber"
            variant="outlined"
            size="small"
            onChange={handleFilterChange}
            value={filter.invoiceNumber}
          />
          <TextField
            label="Invoice Date"
            name="invoiceDate"
            type="date"
            variant="outlined"
            size="small"
            onChange={handleFilterChange}
            value={filter.invoiceDate}
            InputLabelProps={{ shrink: true }}
          />
          <Select
            label="Status"
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            variant="outlined"
            size="small"
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Outstanding">Outstanding</MenuItem>
            <MenuItem value="Received">Received</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
          <TextField
            label="Total Amount (Min)"
            name="totalAmount"
            variant="outlined"
            size="small"
            onChange={handleFilterChange}
            value={filter.totalAmount}
          />
          <TextField
            label="Outstanding Amount (Min)"
            name="outstandingAmount"
            variant="outlined"
            size="small"
            onChange={handleFilterChange}
            value={filter.outstandingAmount}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetFilters}
          >
            Reset Filters
          </Button>
        </FilterContainer>
      </Collapse>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Salesman Name</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Outstanding Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBills.map((bill) => (
              <TableRow key={bill._id}>
                <TableCell>{bill.companyName}</TableCell>
                <TableCell>{bill.salesmanName}</TableCell>
                <TableCell>{bill.customerName}</TableCell>
                <TableCell>{bill.invoiceNumber}</TableCell>
                <TableCell>
                  {new Date(bill.invoiceDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{bill.status}</TableCell>
                <TableCell>{bill.totalAmount}</TableCell>
                <TableCell>{bill.outstandingAmount}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(bill)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(bill._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Bill Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Bill</DialogTitle>
        <DialogContent>
          {currentBill && (
            <>
              <TextField
                label="Company Name"
                name="companyName"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                value={currentBill.companyName}
                onChange={handleEditChange}
              />
              <TextField
                label="Salesman Name"
                name="salesmanName"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                value={currentBill.salesmanName}
                onChange={handleEditChange}
              />
              <TextField
                label="Customer Name"
                name="customerName"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                value={currentBill.customerName}
                onChange={handleEditChange}
              />
              <TextField
                label="Invoice Number"
                name="invoiceNumber"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                value={currentBill.invoiceNumber}
                onChange={handleEditChange}
              />
              <TextField
                label="Invoice Date"
                name="invoiceDate"
                type="date"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                value={currentBill.invoiceDate}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
              />
              <Select
                label="Status"
                name="status"
                value={currentBill.status}
                onChange={handleEditChange}
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
              >
                <MenuItem value="Outstanding">Outstanding</MenuItem>
                <MenuItem value="Received">Received</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
              <TextField
                label="Total Amount"
                name="totalAmount"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                value={currentBill.totalAmount}
                onChange={handleEditChange}
              />
              <TextField
                label="Outstanding Amount"
                name="outstandingAmount"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                value={currentBill.outstandingAmount}
                onChange={handleEditChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBillPage;
