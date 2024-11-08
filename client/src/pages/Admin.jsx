import React, { useEffect, useState } from "react";

import MainDashboard from "../component/MainDashboard/MainDashboard";
import { get } from "../services/ApiEndpoint";
import AdminSidebar from "../component/AdminSidebar";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const GetUser = async () => {
      try {
        // Update the API endpoint to the correct one
        const request = await get("/api/auth/admin");
        const response = request.data;
        console.log(response);
        setMessage(response.message); // Assuming you're showing a message to the admin
      } catch (error) {
        console.error("Error fetching admin dashboard:", error);
      }
    };
    GetUser();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div>
          <AdminSidebar />
          <div>
            {" "}
            <Navbar />
            <Outlet />
          </div>
        </div>

        {/* <MainDashboard /> */}
      </div>
    </>
  );
};

export default Admin;
