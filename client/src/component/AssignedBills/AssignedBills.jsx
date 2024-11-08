// // import React, { useEffect, useState } from "react";
// // import { get } from "../../services/ApiEndpoint"; // Adjust the import path if necessary

// // const AssignedBills = () => {
// //   const [assignedBills, setAssignedBills] = useState([]);

// //   useEffect(() => {
// //     const fetchAssignedBills = async () => {
// //       try {
// //         const response = await get("/api/bills/assigned");
// //         setAssignedBills(response.data);
// //       } catch (error) {
// //         console.error("Error fetching assigned bills:", error);
// //       }
// //     };
// //     fetchAssignedBills();
// //   }, []);

// //   return (
// //     <div style={{ position: "absolute ", left: "20%", top: "9%" }}>
// //       <h2>Assigned Bills</h2>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Company Name</th>
// //             <th>Salesman Name</th>
// //             <th>Customer Name</th>
// //             <th>Invoice Number</th>
// //             <th>Invoice Date</th>
// //             <th>Due Amount</th>
// //             <th>Area</th>
// //             <th>Status</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {assignedBills.map((bill) => (
// //             <tr key={bill._id}>
// //               <td>{bill.companyName}</td>
// //               <td>{bill.salesmanName}</td>
// //               <td>{bill.customerName}</td>
// //               <td>{bill.invoiceNumber}</td>
// //               <td>{new Date(bill.invoiceDate).toLocaleDateString()}</td>
// //               <td>{bill.dueAmount}</td>
// //               <td>{bill.area}</td>
// //               <td>{bill.status}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AssignedBills;
// import React, { useEffect, useState } from "react";
// import { get } from "../../services/ApiEndpoint"; // Adjust the import path if necessary
// import { TextField, Button, Select, MenuItem, Collapse } from "@mui/material";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";

// const FilterContainer = styled("div")(({ theme }) => ({
//   display: "flex",
//   flexWrap: "wrap",
//   gap: "10px",
//   marginBottom: "20px",
//   alignItems: "center",
// }));

// const AssignedBills = () => {
//   const [assignedBills, setAssignedBills] = useState([]);
//   const [filter, setFilter] = useState({
//     companyName: "",
//     salesmanName: "",
//     customerName: "",
//     invoiceNumber: "",
//     invoiceDate: "",
//     status: "",
//     totalAmount: "",
//     outstandingAmount: "",
//   });
//   const [filtersOpen, setFiltersOpen] = useState(true);

//   useEffect(() => {
//     const fetchAssignedBills = async () => {
//       try {
//         const response = await get("/api/bills/assigned");
//         setAssignedBills(response.data);
//       } catch (error) {
//         console.error("Error fetching assigned bills:", error);
//       }
//     };
//     fetchAssignedBills();
//   }, []);

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     setFilter({
//       ...filter,
//       [name]: value,
//     });
//   };

//   const handleResetFilters = () => {
//     setFilter({
//       companyName: "",
//       salesmanName: "",
//       customerName: "",
//       invoiceNumber: "",
//       invoiceDate: "",
//       status: "",
//       totalAmount: "",
//       outstandingAmount: "",
//     });
//   };

//   const filteredBills = assignedBills.filter((bill) => {
//     return (
//       bill.companyName
//         .toLowerCase()
//         .includes(filter.companyName.toLowerCase()) &&
//       bill.salesmanName
//         .toLowerCase()
//         .includes(filter.salesmanName.toLowerCase()) &&
//       bill.customerName
//         .toLowerCase()
//         .includes(filter.customerName.toLowerCase()) &&
//       bill.invoiceNumber
//         .toLowerCase()
//         .includes(filter.invoiceNumber.toLowerCase()) &&
//       (filter.invoiceDate === "" ||
//         new Date(bill.invoiceDate).toLocaleDateString() ===
//           new Date(filter.invoiceDate).toLocaleDateString()) &&
//       (filter.status === "" || bill.status === filter.status)
//     );
//   });

//   return (
//     <div style={{ position: "absolute", left: "20%", top: "9%" }}>
//       <h2>Assigned Bills</h2>
//       <Button
//         onClick={() => setFiltersOpen(!filtersOpen)}
//         startIcon={filtersOpen ? <ExpandLess /> : <ExpandMore />}
//         style={{ marginBottom: "10px" }}
//       >
//         {filtersOpen ? "Hide Filters" : "Show Filters"}
//       </Button>
//       <Collapse in={filtersOpen}>
//         <FilterContainer>
//           <TextField
//             label="Company Name"
//             name="companyName"
//             variant="outlined"
//             size="small"
//             onChange={handleFilterChange}
//             value={filter.companyName}
//           />
//           <TextField
//             label="Salesman Name"
//             name="salesmanName"
//             variant="outlined"
//             size="small"
//             onChange={handleFilterChange}
//             value={filter.salesmanName}
//           />
//           <TextField
//             label="Customer Name"
//             name="customerName"
//             variant="outlined"
//             size="small"
//             onChange={handleFilterChange}
//             value={filter.customerName}
//           />
//           <TextField
//             label="Invoice Number"
//             name="invoiceNumber"
//             variant="outlined"
//             size="small"
//             onChange={handleFilterChange}
//             value={filter.invoiceNumber}
//           />
//           <TextField
//             label="Invoice Date"
//             name="invoiceDate"
//             type="date"
//             variant="outlined"
//             size="small"
//             onChange={handleFilterChange}
//             value={filter.invoiceDate}
//             InputLabelProps={{ shrink: true }}
//           />
//           <Select
//             label="Status"
//             name="status"
//             value={filter.status}
//             onChange={handleFilterChange}
//             variant="outlined"
//             size="small"
//             displayEmpty
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="Outstanding">Outstanding</MenuItem>
//             <MenuItem value="Received">Received</MenuItem>
//             <MenuItem value="Cancelled">Cancelled</MenuItem>
//           </Select>
//           <TextField
//             label="Total Amount (Min)"
//             name="totalAmount"
//             variant="outlined"
//             size="small"
//             onChange={handleFilterChange}
//             value={filter.totalAmount}
//           />
//           <TextField
//             label="Outstanding Amount (Min)"
//             name="outstandingAmount"
//             variant="outlined"
//             size="small"
//             onChange={handleFilterChange}
//             value={filter.outstandingAmount}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleResetFilters}
//           >
//             Reset Filters
//           </Button>
//         </FilterContainer>
//       </Collapse>
//       <table>
//         <thead>
//           <tr>
//             <th>Company Name</th>
//             <th>Salesman Name</th>
//             <th>Customer Name</th>
//             <th>Invoice Number</th>
//             <th>Invoice Date</th>
//             <th>Total Amount</th>
//             <th>Outstanding Amount</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredBills.map((bill) => (
//             <tr key={bill._id}>
//               <td>{bill.companyName}</td>
//               <td>{bill.salesmanName}</td>
//               <td>{bill.customerName}</td>
//               <td>{bill.invoiceNumber}</td>
//               <td>{new Date(bill.invoiceDate).toLocaleDateString()}</td>
//               <td>{bill.totalAmount}</td>
//               <td>{bill.outstandingAmount}</td>
//               <td>{bill.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AssignedBills;
import React, { useEffect, useState } from "react";
import { get } from "../../services/ApiEndpoint"; // Adjust the import path if necessary
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
  Select,
  MenuItem,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const FilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "20px",
  alignItems: "center",
}));

const AssignedBills = () => {
  const [assignedBills, setAssignedBills] = useState([]);
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
  const [filtersOpen, setFiltersOpen] = useState(true);

  useEffect(() => {
    const fetchAssignedBills = async () => {
      try {
        const response = await get("/api/bills/assigned");
        setAssignedBills(response.data);
      } catch (error) {
        console.error("Error fetching assigned bills:", error);
      }
    };
    fetchAssignedBills();
  }, []);

  // Handle filter change
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilter({
      companyName: "",
      salesmanName: "",
      customerName: "",
      invoiceNumber: "",
      invoiceDate: "",
      status: "",
      totalAmount: "",
      outstandingAmount: "",
    });
  };

  // Filter assigned bills based on filter state
  const filteredBills = assignedBills.filter((bill) => {
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

  return (
    <div
      style={{
        padding: "20px",
        width: "77%",
        position: "absolute",
        top: "5%",
        left: "20%",
        fontFamily: "revert-layer",
      }}
    >
      <h1>Assigned Bills</h1>
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
              <TableCell>Total Amount</TableCell>
              <TableCell>Outstanding Amount</TableCell>
              <TableCell>Status</TableCell>
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
                <TableCell>{bill.totalAmount}</TableCell>
                <TableCell>{bill.outstandingAmount}</TableCell>
                <TableCell>{bill.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AssignedBills;
