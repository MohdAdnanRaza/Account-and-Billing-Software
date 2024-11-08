// import React from "react";
// import { AppBar, Toolbar, Typography, Box, Divider } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const SettingHeader = () => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { label: "My Profile", path: "/" },
//     { label: "Add New Employee", path: "/" },
//     { label: "Team ", path: "/about" },
//     { label: "Password Reset ", path: "/about" },
//     { label: "Services", path: "/services" },
//     { label: "Contact", path: "/contact" },
//   ];

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <AppBar
//       position="static"
//       sx={{
//         backgroundColor: "#333",
//         padding: "0.4rem 0.2rem",
//         width: "110%",
//         height: "75px",
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
//         {menuItems.map((item, index) => (
//           <React.Fragment key={item.label}>
//             <Box
//               sx={{
//                 padding: "0.5rem 1rem",
//                 cursor: "pointer",
//                 "&:hover": {
//                   backgroundColor: "#555",
//                 },
//               }}
//               onClick={() => handleNavigation(item.path)}
//             >
//               <Typography variant="h6" color="inherit">
//                 {item.label}
//               </Typography>
//             </Box>
//             {index < menuItems.length - 1 && (
//               <Divider
//                 orientation="vertical"
//                 flexItem
//                 sx={{ backgroundColor: "#777", marginX: 1 }}
//               />
//             )}
//           </React.Fragment>
//         ))}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default SettingHeader;
import React from "react";
import { AppBar, Toolbar, Typography, Box, Divider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const SettingHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "My Profile", path: "/admin/user/profile" },
    { label: "Add New Employee", path: "/admin/user/add-new-employee" },
    { label: "Team", path: "/admin/user/team" },
    { label: "Password Reset", path: "/password-reset" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#333",
        padding: "0.4rem 0.2rem",
        width: "100%",
        height: "75px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <Box
              sx={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
                color: location.pathname === item.path ? "#ffa726" : "#fff", // Active color styling
                "&:hover": {
                  backgroundColor: "#555",
                },
              }}
              onClick={() => handleNavigation(item.path)}
            >
              <Typography variant="h6">{item.label}</Typography>
            </Box>
            {index < menuItems.length - 1 && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{ backgroundColor: "#777", marginX: 1 }}
              />
            )}
          </React.Fragment>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default SettingHeader;
