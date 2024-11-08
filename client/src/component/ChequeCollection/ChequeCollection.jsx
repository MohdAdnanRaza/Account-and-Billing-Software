// import React, { useState, useEffect } from "react";
// import { post, get } from "../../services/ApiEndpoint";
// import toast from "react-hot-toast";

// const ChequeCollection = () => {
//   const [cheques, setCheques] = useState([]);

//   // Fetch all cheques from the database
//   const fetchCheques = async () => {
//     try {
//       const response = await get("/api/cheques");
//       setCheques(response.data);
//     } catch (error) {
//       console.error("Error fetching cheques:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCheques();
//   }, []);

//   const updateChequeStatus = async (chequeId, status) => {
//     try {
//       const response = await post("/api/cheques/updateStatus", {
//         chequeId,
//         status,
//       });
//       if (response.status === 200) {
//         toast.success("Cheque status updated successfully!");
//         fetchCheques(); // Refresh cheques after update
//       } else {
//         toast.error("Failed to update cheque status.");
//       }
//     } catch (error) {
//       console.error("Error updating cheque status:", error);
//       toast.error("Error updating cheque status.");
//     }
//   };

//   return (
//     <div style={{ position: "absolute", top: "50%", left: "30%" }}>
//       <h2>Cheque Payment Management</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Cheque Number</th>
//             <th>Date</th>
//             <th>Customer Name</th>
//             <th>Amount</th>
//             <th>Cheque Photo</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cheques.map((cheque) => (
//             <tr key={cheque._id}>
//               <td>{cheque.chequeNumber}</td>
//               <td>{new Date(cheque.date).toLocaleDateString()}</td>
//               <td>{cheque.customerName}</td>
//               <td>₹{cheque.amount}</td>
//               <td>
//                 <img
//                   src={cheque.photoUrl}
//                   alt="cheque"
//                   style={{ width: "100px", height: "50px" }}
//                 />
//               </td>
//               <td>{cheque.status}</td>
//               <td>
//                 {cheque.status === "Received" && (
//                   <button
//                     onClick={() =>
//                       updateChequeStatus(cheque._id, "Sent to Bank")
//                     }
//                   >
//                     Send to Bank
//                   </button>
//                 )}
//                 {cheque.status === "Sent to Bank" && (
//                   <button
//                     onClick={() => updateChequeStatus(cheque._id, "Processed")}
//                   >
//                     Processed
//                   </button>
//                 )}
//                 {cheque.status === "Processed" && <span>Completed</span>}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ChequeCollection;
import React from "react";
import PaymentApprovalComponent from "../PaymentApprovalComponent";
const ChequeCollection = () => {
  return (
    <>
      <div style={{ position: "absolute", top: "10%", left: "20%" }}>
        <PaymentApprovalComponent />
      </div>
    </>
  );
};
export default ChequeCollection;
