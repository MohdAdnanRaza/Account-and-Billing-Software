// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { get } from "../services/ApiEndpoint";

// // const TotalCollection = ({ salesmanName = "Jackson" }) => {
// //   const [wallet, setWallet] = useState(0);
// //   const [paymentSummary, setPaymentSummary] = useState({
// //     cash: 0,
// //     upi: 0,
// //     cheque: 0,
// //   });

// //   useEffect(() => {
// //     if (!salesmanName) {
// //       console.warn("Salesman name is missing or undefined");
// //       return;
// //     }
// //     const fetchWalletAndSummary = async () => {
// //       try {
// //         const response = await get(
// //           `/api/bills/salesman/wallet-summary?salesmanName=${salesmanName}`
// //         );
// //         setWallet(response.data.wallet);
// //         setPaymentSummary(response.data.paymentSummary);
// //       } catch (error) {
// //         console.error("Error fetching wallet and payment summary:", error);
// //       }
// //     };

// //     fetchWalletAndSummary();
// //   }, [salesmanName]);

// //   return (
// //     <div>
// //       <h2>Wallet: ₹{wallet}</h2>
// //       <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
// //         <h3>Payment Summary for {salesmanName}</h3>
// //         <p>Cash Collected: ₹{paymentSummary.cash}</p>
// //         <p>UPI Collected: ₹{paymentSummary.upi}</p>
// //         <p>Cheque Collected: ₹{paymentSummary.cheque}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TotalCollection;
// import React, { useState, useEffect } from "react";
// import { get } from "../services/ApiEndpoint";

// const TotalCollection = () => {
//   const [salesmenData, setSalesmenData] = useState([]);

//   useEffect(() => {
//     const fetchAllSalesmenData = async () => {
//       try {
//         const response = await get(`/api/bills/salesmen/wallet-summaries`);
//         setSalesmenData(response.data); // Assuming response.data is an array of salesmen data
//       } catch (error) {
//         console.error(
//           "Error fetching salesmen wallet and payment summaries:",
//           error
//         );
//       }
//     };

//     fetchAllSalesmenData();
//   }, []);

//   return (
//     <div>
//       <h2>Salesmen Wallet and Payment Summaries</h2>
//       {salesmenData.map((salesman, index) => (
//         <div
//           key={index}
//           style={{
//             padding: "20px",
//             backgroundColor: "#f9f9f9",
//             marginBottom: "10px",
//           }}
//         >
//           <h3>
//             {salesman.salesmanName}'s Wallet: ₹{salesman.wallet}
//           </h3>
//           <p>Cash Collected: ₹{salesman.paymentSummary.cash}</p>
//           <p>UPI Collected: ₹{salesman.paymentSummary.upi}</p>
//           <p>Cheque Collected: ₹{salesman.paymentSummary.cheque}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TotalCollection;
import React, { useState, useEffect } from "react";
import { get } from "../services/ApiEndpoint";

const TotalCollection = () => {
  const [salesmenData, setSalesmenData] = useState([]);

  useEffect(() => {
    const fetchAllSalesmenData = async () => {
      try {
        const response = await get(`/api/bills/salesmen/wallet-summaries`);
        setSalesmenData(response.data);
      } catch (error) {
        console.error(
          "Error fetching salesmen wallet and payment summaries:",
          error
        );
      }
    };

    fetchAllSalesmenData();
  }, []);

  // Define an array of background colors for variety
  const cardColors = ["#FFFAE5", "#E3F2FD", "#E8F5E9", "#FFF3E0", "#F3E5F5"];

  return (
    <div
      style={{ padding: "20px", position: "absolute", top: "8%", left: "12%" }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Today's Collection
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {salesmenData.map((salesman, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              backgroundColor: cardColors[index % cardColors.length],
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            className="card"
          >
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.1em",
              }}
            >
              {salesman.salesmanName}'s Wallet: ₹{salesman.wallet}
            </div>
            <hr style={{ margin: 0, borderColor: "#e0e0e0" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #e0e0e0",
                  paddingBottom: "10px",
                }}
              >
                <span>Cash Collected</span>
                <span>₹{salesman.paymentSummary.cash}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #e0e0e0",
                  paddingBottom: "10px",
                }}
              >
                <span>UPI Collected</span>
                <span>₹{salesman.paymentSummary.upi}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Cheque Collected</span>
                <span>₹{salesman.paymentSummary.cheque}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Styles for hover effect */}
      <style jsx>{`
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default TotalCollection;
