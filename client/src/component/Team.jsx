// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const Team = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch all users when the component loads
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("/api/auth/users");
//         setUsers(response.data.users);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         toast.error("Failed to load users");
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleEdit = (userId) => {
//     // Implement edit functionality
//     toast.success("Edit functionality to be implemented");
//   };

//   const handleDelete = async (userId) => {
//     try {
//       await axios.delete(`/api/auth/users/${userId}`);
//       setUsers(users.filter((user) => user._id !== userId));
//       toast.success("User deleted successfully");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       toast.error("Failed to delete user");
//     }
//   };

//   const handleResetPassword = (userId) => {
//     // Implement reset password functionality
//     toast.success("Reset password functionality to be implemented");
//   };

//   return (
//     <div>
//       <h2>Team</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Phone Number</th>

//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user.name.split(" ")[0]}</td>
//               <td>{user.name.split(" ")[1]}</td>
//               <td>{user.phone}</td>

//               <td>
//                 <button onClick={() => handleEdit(user._id)}>Edit</button>
//                 <button onClick={() => handleDelete(user._id)}>Delete</button>
//                 <button onClick={() => handleResetPassword(user._id)}>
//                   Reset Password
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <style jsx>{`
//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         th,
//         td {
//           padding: 12px;
//           border: 1px solid #ddd;
//         }
//         th {
//           background-color: #f4f4f4;
//           font-weight: bold;
//         }
//         button {
//           margin-right: 8px;
//           padding: 6px 10px;
//           cursor: pointer;
//           border: none;
//           border-radius: 4px;
//         }
//         button:hover {
//           opacity: 0.8;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Team;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { lightGreen } from "@mui/material/colors";

// const Team = () => {
//   const [users, setUsers] = useState([]); // Initialize as an empty array

//   useEffect(() => {
//     // Fetch all users when the component loads
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/auth/users"
//         );
//         console.log(response);
//         setUsers(response.data.users || []); // Ensure it defaults to an array if undefined
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         toast.error("Failed to load users");
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleEdit = (userId) => {
//     toast.success("Edit functionality to be implemented");
//   };

//   const handleDelete = async (userId) => {
//     try {
//       await axios.delete(`/api/auth/users/${userId}`);
//       setUsers(users.filter((user) => user._id !== userId));
//       toast.success("User deleted successfully");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       toast.error("Failed to delete user");
//     }
//   };

//   const handleResetPassword = (userId) => {
//     toast.success("Reset password functionality to be implemented");
//   };

//   return (
//     <div>
//       <h2>Team</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Phone Number</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user.name?.split(" ")[0] || "N/A"}</td>
//               <td>{user.name?.split(" ")[1] || "N/A"}</td>
//               <td>{user.phone || "N/A"}</td>
//               <td>
//                 <button onClick={() => handleEdit(user._id)}>Edit</button>
//                 <button onClick={() => handleDelete(user._id)}>Delete</button>
//                 <button onClick={() => handleResetPassword(user._id)}>
//                   Reset Password
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <style jsx>{`
//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         th,
//         td {
//           padding: 12px;
//           border: 1px solid #ddd;
//         }
//         th {
//           background-color: #f4f4f4;
//           font-weight: bold;
//         }
//         button {
//           margin-right: 8px;
//           padding: 6px 10px;
//           cursor: pointer;
//           border: none;
//           border-radius: 4px;
//         }
//         button:hover {
//           opacity: 0.8;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Team;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Paper,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { lightGreen } from "@mui/material/colors";
// import { deleteUser } from "../services/ApiEndpoint";

// const Team = () => {
//   const [users, setUsers] = useState([]);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/auth/users"
//         );
//         setUsers(response.data.users || []);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         toast.error("Failed to load users");
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleEditClick = (user) => {
//     setCurrentUser(user);
//     setEditModalOpen(true);
//   };

//   const handleEditChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentUser({ ...currentUser, [name]: value });
//   };

//   const handleEditSave = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:4000/api/auth/users/${currentUser._id}`,
//         currentUser
//       );
//       setUsers((prev) =>
//         prev.map((user) =>
//           user._id === currentUser._id ? response.data : user
//         )
//       );
//       toast.success("User updated successfully");
//       setEditModalOpen(false);
//     } catch (error) {
//       console.error("Error updating user:", error);
//       toast.error("Failed to update user");
//     }
//   };

//   const handleDelete = async (userId) => {
//     try {
//       await deleteUser(`http://localhost:4000/api/auth/users/${userId}`);
//       setUsers(users.filter((user) => user._id !== userId));
//       toast.success("User deleted successfully");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       toast.error("Failed to delete user");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Team</h2>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>First Name</TableCell>
//               <TableCell>Last Name</TableCell>
//               <TableCell>Phone Number</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Password</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user._id}>
//                 <TableCell>{user.name?.split(" ")[0] || "N/A"}</TableCell>
//                 <TableCell>{user.name?.split(" ")[1] || "N/A"}</TableCell>
//                 <TableCell>{user.phone || "N/A"}</TableCell>
//                 <TableCell>{user.role || "N/A"}</TableCell>
//                 <TableCell>{user.password || "N/A"}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEditClick(user)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(user._id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Edit User Modal */}
//       <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <DialogTitle>Edit User</DialogTitle>
//         <DialogContent>
//           {currentUser && (
//             <>
//               <TextField
//                 label="First Name"
//                 name="firstName"
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 margin="dense"
//                 value={currentUser.name?.split(" ")[0] || ""}
//                 onChange={(e) => {
//                   const updatedName = `${e.target.value} ${
//                     currentUser.name.split(" ")[1]
//                   }`;
//                   setCurrentUser({ ...currentUser, name: updatedName });
//                 }}
//               />
//               <TextField
//                 label="Last Name"
//                 name="lastName"
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 margin="dense"
//                 value={currentUser.name?.split(" ")[1] || ""}
//                 onChange={(e) => {
//                   const updatedName = `${currentUser.name.split(" ")[0]} ${
//                     e.target.value
//                   }`;
//                   setCurrentUser({ ...currentUser, name: updatedName });
//                 }}
//               />
//               <TextField
//                 label="Phone Number"
//                 name="phone"
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 margin="dense"
//                 value={currentUser.phone || ""}
//                 onChange={handleEditChange}
//               />
//               <Select
//                 label="Role"
//                 name="role"
//                 value={currentUser.role || ""}
//                 onChange={handleEditChange}
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 margin="dense"
//               >
//                 <MenuItem value="Admin">Admin</MenuItem>
//                 <MenuItem value="Supervisor">Supervisor</MenuItem>
//                 <MenuItem value="Salesman">Salesman</MenuItem>
//               </Select>
//               <TextField
//                 label="Password"
//                 name="password"
//                 type="password"
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 margin="dense"
//                 value={currentUser.password || ""}
//                 onChange={handleEditChange}
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditModalOpen(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleEditSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Team;
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUser } from "../services/ApiEndpoint";

const Team = () => {
  const [users, setUsers] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/users"
        );
        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setEditModalOpen(true);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(
        `/api/auth/users/${currentUser._id}`,
        currentUser
      );
      setUsers((prev) =>
        prev.map((user) =>
          user._id === currentUser._id ? response.data : user
        )
      );
      toast.success("User updated successfully");
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const handleDeleteConfirmation = (userId) => {
    setUserToDelete(userId);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      console.log("User ID to delete:", userToDelete);
      await deleteUser(`/api/auth/users/${userToDelete}`);
      setUsers(users.filter((user) => user._id !== userToDelete));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setConfirmDeleteOpen(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Team</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name?.split(" ")[0] || "N/A"}</TableCell>
                <TableCell>{user.name?.split(" ")[1] || "N/A"}</TableCell>
                <TableCell>{user.phone || "N/A"}</TableCell>
                <TableCell>{user.role || "N/A"}</TableCell>
                <TableCell>{user.password || "N/A"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteConfirmation(user._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {currentUser && (
            <>
              <TextField
                label="First Name"
                name="firstName"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                value={currentUser.name?.split(" ")[0] || ""}
                onChange={(e) => {
                  const updatedName = `${e.target.value} ${
                    currentUser.name.split(" ")[1]
                  }`;
                  setCurrentUser({ ...currentUser, name: updatedName });
                }}
              />
              <TextField
                label="Last Name"
                name="lastName"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                value={currentUser.name?.split(" ")[1] || ""}
                onChange={(e) => {
                  const updatedName = `${currentUser.name.split(" ")[0]} ${
                    e.target.value
                  }`;
                  setCurrentUser({ ...currentUser, name: updatedName });
                }}
              />
              <TextField
                label="Phone Number"
                name="phone"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                value={currentUser.phone || ""}
                onChange={handleEditChange}
              />
              <Select
                label="Role"
                name="role"
                value={currentUser.role || ""}
                onChange={handleEditChange}
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Supervisor">Supervisor</MenuItem>
                <MenuItem value="Salesman">Salesman</MenuItem>
              </Select>
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                value={currentUser.password || ""}
                onChange={handleEditChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Deletion */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Team;
