import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
const AdminSidebar = () => {
  return (
    <div
      style={{
        background: "#00FFFF",
        width: "240px",
        paddingLeft: "9%",
        height: "200%",
        paddingTop: "5%",
      }}
    >
      <div>
        <h3>Admin Dashboard</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <NavLink
          to="/admin"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem  ",
            borderRadius: "4px",
            border: "2px solid black",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "70%",
            color: isActive ? "blue" : "black", // Change color based on active state
            backgroundColor: isActive ? "#f0f0f0" : "transparent", // Optional background color change
          })}
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/addbills"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem  ",
            borderRadius: "4px",
            border: "2px solid black",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "70%",
            marginTop: "5%",
            color: isActive ? "blue" : "black", // Change color based on active state
            backgroundColor: isActive ? "#f0f0f0" : "transparent", // Optional background color change
          })}
        >
          <MdAddChart />
          <span>Add New Bills</span>
        </NavLink>

        <NavLink
          to="/admin/billassign"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem  ",
            borderRadius: "4px",
            border: "2px solid black",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "70%",
            marginTop: "5%",
            color: isActive ? "blue" : "black", // Change color based on active state
            backgroundColor: isActive ? "#f0f0f0" : "transparent", // Optional background color change
          })}
        >
          <MdAssignmentAdd />
          <span>Bills Assignment</span>
        </NavLink>
        <NavLink
          to="/admin/assignbills"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem  ",
            borderRadius: "4px",
            border: "2px solid black",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "70%",
            marginTop: "5%",
            color: isActive ? "blue" : "black", // Change color based on active state
            backgroundColor: isActive ? "#f0f0f0" : "transparent", // Optional background color change
          })}
        >
          <MdAssignmentTurnedIn />
          <span>Assigned Bills</span>
        </NavLink>
        <NavLink
          to="/admin/cheque"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem  ",
            borderRadius: "4px",
            border: "2px solid black",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "70%",
            marginTop: "5%",
            color: isActive ? "blue" : "black", // Change color based on active state
            backgroundColor: isActive ? "#f0f0f0" : "transparent", // Optional background color change
          })}
        >
          <CiMoneyCheck1 />
          <span>Cheque collection</span>
        </NavLink>
        <NavLink
          to="/admin/user"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem  ",
            borderRadius: "4px",
            border: "2px solid black",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "70%",
            marginTop: "5%",
          }}
        >
          <FaUser />
          <span>Settings </span>
        </NavLink>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            padding: "0.75rem 1rem  ",
            borderRadius: "4px",
            border: "2px solid black",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "70%",
            marginTop: "5%",
            color: isActive ? "blue" : "black", // Change color based on active state
            backgroundColor: isActive ? "#f0f0f0" : "transparent", // Optional background color change
          })}
        >
          <CiLogout />
          <span>Logout </span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;