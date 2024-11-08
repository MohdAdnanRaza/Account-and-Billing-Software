// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./UserManagement.css";
// import Register from "../../pages/Register";

// const UserManagement = () => {
//   return (
//     <>
//       {" "}
//       <div>
//         <Register />
//       </div>
//       ;
//     </>
//   );
// };

// export default UserManagement;
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./UserManagement.css";
import Register from "../../pages/Register";
import SettingHeader from "../SettingHeader";
import { Outlet } from "react-router-dom";

Modal.setAppElement("#root"); // Set the root element for accessibility

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ position: "absolute", left: "21%", top: "8%" }}>
        <h1>Settings</h1>
        <p style={{ color: "#4a4a4a" }}>Manage your Account and Preference </p>
        <SettingHeader />
        <div
          style={{ padding: "20px", flexGrow: 1, backgroundColor: "#f5f5f5" }}
        >
          <Outlet />
        </div>
      </div>

      <div
        className="user-management"
        style={{ position: "absolute", top: "38%", left: "25%" }}
      >
        {/* <button className="add-employee-link" onClick={openModal}>
          Add New Employee
        </button> */}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <button onClick={closeModal} className="close-button">
            &times;
          </button>
          <Register />
          {/* <span onClick={closeModal} className="close-icon">
            &times;
          </span> */}
        </Modal>
      </div>
    </>
  );
};

export default UserManagement;
