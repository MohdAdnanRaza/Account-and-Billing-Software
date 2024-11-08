import React from "react";
import WelcomeMessage from "./WelcomeMessage";

const SaleNavbar = () => {
  return (
    <div
      style={{
        color: "#EBA286",
        backgroundColor: "#87CEEB",
        //display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "60px",
        position: "absolute",
        bottom: "91%",
        // left: "1%",
        // marginLeft: "5px",
      }}
    >
      <WelcomeMessage />
      <button
        style={{
          marginLeft: "85%",
          height: "40px",
          width: "100px",
          //   marginTop: "1%",
          marginRight: "2%",
          position: "absolute",
          top: "16%",
          left: "7%",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default SaleNavbar;
