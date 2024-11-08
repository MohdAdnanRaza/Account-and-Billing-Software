import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminLayout = () => {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!user || user.role != "admin") {
  //       navigate("/login");
  //     }
  //   }, [user]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminLayout;
