import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/logout"); // Call the logout API
      console.log(response.data.message);
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div
      style={{
        color: "#EBA286",
        backgroundColor: "#87CEEB",
        // display: "flex",
        justifyContent: "center",
        width: "81%",
        height: "60px",
        position: "absolute",
        bottom: "91%",

        left: "18%",
        marginLeft: "19px",
      }}
    >
      <WelcomeMessage />
      <button
        onClick={handleLogout}
        style={{
          marginLeft: "85%",
          height: "40px",
          width: "100px",
          // marginTop: "1%",
          marginRight: "2%",
          position: "absolute",
          top: "17%",
          left: "4%",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
