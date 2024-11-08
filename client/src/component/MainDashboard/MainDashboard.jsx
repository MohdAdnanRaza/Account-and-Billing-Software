import React from "react";
import "./MainDashboard.css";
import Cards from "../Cards/Cards";
import Chart from "../Chart/Chart";
import LineChart from "../LineChart/LineChart";
import UploadExcel from "../UploadExcel";
import DisplayBills from "../DisplayBills";
import PaymentApprovalComponent from "../PaymentApprovalComponent";
import FilterBills from "../FilterBills";
import BillsByAge from "../BillDashboard";
import BillAssignment from "../BillAssignment/BillAssignment";
import BillDashboard from "../BillDashboard";

const MainDashboard = () => {
  return (
    <div className="MainDash">
      {/* <h1 style={{ marginLeft: "2%" }}>Company Name</h1> */}
      <div style={{ marginLeft: "5%", marginTop: "13%" }}>
        <Cards />
        <BillDashboard />
      </div>
    </div>
  );
};

export default MainDashboard;
