import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { get } from "../services/ApiEndpoint";
import Card from "./Card/Card";
import { UilClipboardAlt } from "@iconscout/react-unicons";
const BillDashboard = () => {
  const [columnDefs] = useState([
    {
      headerName: "Salesman Name",
      field: "salesmanName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Days",

      children: [
        { headerName: "0-7 Days", field: "days_0_7", width: 140 },
        { headerName: "8-14 Days", field: "days_8_14", width: 140 },
        { headerName: "15-21 Days", field: "days_15_21", width: 140 },
        { headerName: "22-28 Days", field: "days_22_28", width: 140 },
      ],
    },
    {
      headerName: "Total Outstanding Amount",
      field: "totalAmount",
      width: 250,
    },
  ]);

  const [rowData, setRowData] = useState([]);
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState({});
  const [salesmanTotals, setSalesmanTotals] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);

  const fetchBills = async () => {
    setLoading(true);
    try {
      const response = await get(
        `/api/bills/admin/filter?companyName=${company}`
      );
      const billMap = {};
      const totals = {};

      Object.entries(response.data).forEach(([days, bills]) => {
        bills.forEach((bill) => {
          if (bill.outstandingAmount !== 0) {
            const key = `${bill.salesmanName}_${bill.invoiceNumber}`;
            const daysInt = parseInt(days, 10);

            if (!billMap[key]) {
              billMap[key] = {
                ...bill,
                days_0_7: 0,
                days_8_14: 0,
                days_15_21: 0,
                days_22_28: 0,
                totalAmount: 0,
              };
            }

            if (daysInt >= 0 && daysInt <= 7)
              billMap[key].days_0_7 += bill.outstandingAmount;
            else if (daysInt >= 8 && daysInt <= 14)
              billMap[key].days_8_14 += bill.outstandingAmount;
            else if (daysInt >= 15 && daysInt <= 21)
              billMap[key].days_15_21 += bill.outstandingAmount;
            else if (daysInt >= 22 && daysInt <= 28)
              billMap[key].days_22_28 += bill.outstandingAmount;

            billMap[key].totalAmount =
              billMap[key].days_0_7 +
              billMap[key].days_8_14 +
              billMap[key].days_15_21 +
              billMap[key].days_22_28;

            totals[bill.salesmanName] =
              (totals[bill.salesmanName] || 0) + bill.outstandingAmount;
          }
        });
      });

      setRowData(Object.values(billMap));
      setColumns(response.data);

      const overallTotal = Object.values(totals).reduce(
        (acc, value) => acc + value,
        0
      );
      setSalesmanTotals(totals);
      setGrandTotal(overallTotal);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [company]);

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const uniqueCompanies = [
    ...new Set(
      Object.values(columns)
        .flat()
        .map((bill) => bill.companyName)
    ),
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <header style={{ marginBottom: "20px" }}>
        <h3>Ageing Report</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div>
            <label
              htmlFor="company"
              style={{ marginRight: "10px", fontWeight: "bold" }}
            >
              Select Company:
            </label>
            <select
              id="company"
              value={company}
              onChange={handleCompanyChange}
              style={{
                padding: "8px",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select Company</option>
              {uniqueCompanies.map((companyName, index) => (
                <option key={index} value={companyName}>
                  {companyName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "16px", color: "#333" }}>
          Loading...
        </p>
      ) : (
        <div>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: "225%" }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
          <div
            style={{
              marginTop: "15px",
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
              marginLeft: "70%",
              background: "#87CEEB",
              height: "30px",
              width: "80%",
              borderRadius: "8px",
            }}
          >
            <p style={{ paddingTop: "5px" }}>Grand Total: ₹{grandTotal}</p>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "9%",
                width: "50%",
              }}
            >
              <Card
                title="Total Outstanding Amount"
                value={grandTotal} // Pass the grandTotal to the Card component
                color={{
                  backGround: "#87CEEB",
                  boxShadow: "0px 10px 20px 0px #87CEEB",
                }}
                barValue={100} // Set this as needed
                png={() => (
                  <span>
                    <UilClipboardAlt />
                  </span>
                )} // Adjust or replace this as needed
                series={[{ data: [grandTotal] }]} // Series data for the chart in ExpandedCard
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDashboard;
