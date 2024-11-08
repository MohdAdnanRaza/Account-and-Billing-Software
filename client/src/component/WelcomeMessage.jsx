import React from "react";
import { useLocation } from "react-router-dom";

const WelcomeMessage = () => {
  const location = useLocation();

  // Determine the role based on the current route
  const getRoleFromPath = (path) => {
    if (path.includes("/admin")) {
      return "Admin";
    } else if (path.includes("/supervisor")) {
      return "Supervisor";
    } else {
      return "Salesman"; // Default fallback
    }
  };

  const role = getRoleFromPath(location.pathname);

  return (
    <p style={{ paddingLeft: "20px", paddingTop: "5px" }}>Welcome {role}</p>
  );
};

export default WelcomeMessage;
