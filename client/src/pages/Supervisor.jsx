import React from "react";
import Navbar from "../component/Navbar";
import SuperSidebar from "../component/SuperSidebar";
import { Outlet } from "react-router-dom";

const Supervisor = () => {
  return (
    <div>
      <SuperSidebar />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Supervisor;
