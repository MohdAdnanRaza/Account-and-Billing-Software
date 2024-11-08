import React from "react";
import { TextField, Select, MenuItem, Button, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const FilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "20px",
  alignItems: "center",
}));

const BillFilters = ({
  filter,
  setFilter,
  filtersOpen,
  setFiltersOpen,
  handleResetFilters,
}) => {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <>
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
    </>
  );
};

export default BillFilters;
