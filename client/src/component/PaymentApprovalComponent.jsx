import React, { useState, useEffect } from "react";
import { get, post } from "../services/ApiEndpoint"; // Utility functions for API calls
import toast from "react-hot-toast";
import Modal from "react-modal"; // Using react-modal for popup

const PaymentApprovalComponent = () => {
  const [pendingPayments, setPendingPayments] = useState(() => {
    const savedPayments = localStorage.getItem("pendingPayments");
    return savedPayments ? JSON.parse(savedPayments) : [];
  });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState(""); // State for rejection reason

  // Fetch pending payments
  // const fetchPendingPayments = async () => {
  //   try {
  //     const response = await get("/api/bills/admin/paymentsPending");
  //     console.log(response.data);
  //     // Filter out cash payments, only showing cheque payments
  //     const chequePayments = response.data.filter(
  //       (payment) => payment.paymentApproval.paymentMode === "cheque"
  //     );
  //     setPendingPayments(chequePayments);
  //     localStorage.setItem("pendingPayments", JSON.stringify(chequePayments)); // Store in local storage
  //   } catch (error) {
  //     console.error("Error fetching pending payments:", error);
  //   }
  // };
  const fetchPendingPayments = async () => {
    try {
      const response = await get("/api/bills/admin/paymentsPending");
      console.log("API Response:", response.data);
      // Filter only cheque payments
      const chequePayments = response.data.filter(
        (payment) => payment.paymentApproval.paymentMode === "cheque"
      );

      // Check if there is a difference between fetched data and local storage
      const localPayments = localStorage.getItem("pendingPayments");
      const parsedLocalPayments = localPayments
        ? JSON.parse(localPayments)
        : [];

      // Only update state and localStorage if there's a change
      if (
        JSON.stringify(chequePayments) !== JSON.stringify(parsedLocalPayments)
      ) {
        setPendingPayments(chequePayments);
        localStorage.setItem("pendingPayments", JSON.stringify(chequePayments));
      }
    } catch (error) {
      console.error("Error fetching pending payments:", error);
    }
  };
  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const handleChequeAction = async (billId, action) => {
    try {
      const response = await post("/api/cheques/action", {
        billId,
        action,
        reason: rejectionReason,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setPendingPayments((prevPayments) => {
          const updatedPayments = prevPayments.map((payment) => {
            if (payment._id === billId) {
              const amount = payment.paymentApproval.amount;
              if (action === "approved") {
                const salesmanId = payment.salesmanId;
                // Deduct the amount from the salesman here
                updateSalesmanDashboard(salesmanId, amount);
                // Optionally check if the payment is a cheque
                if (
                  payment.paymentApproval.paymentMode === "cheque" &&
                  amount === 0
                ) {
                  payment.paymentApproval.chequeStatus = "fully paid";
                }
              }
              return {
                ...payment,
                paymentApproval: {
                  ...payment.paymentApproval,
                  chequeStatus: action, // Update the status directly
                },
              };
            }
            return payment;
          });
          localStorage.setItem(
            "pendingPayments",
            JSON.stringify(updatedPayments)
          );
          return updatedPayments;
        });
        setIsModalOpen(false);
        setRejectionReason("");
      }
    } catch (error) {
      toast.error("Failed to perform action. Try again.");
      console.error("Error performing action:", error);
    }
  };
  // Function to update the Salesman Dashboard (mockup)
  const updateSalesmanDashboard = async (salesmanId, amount) => {
    try {
      await post(`/api/salesman/update`, { salesmanId, amount });
    } catch (error) {
      console.error("Error updating salesman dashboard:", error);
    }
  };
  const openModal = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRejectionReason(""); // Reset rejection reason when closing modal
  };
  const buttonStyles = {
    base: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      fontWeight: 500,
      marginRight: "10px",
      width: "40%",
      position: "absolute",
      left: "57%",
      top: "24%",
    },
    sentbase: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      fontWeight: 500,
      marginRight: "10px",
      width: "40%",
      position: "absolute",
      left: "57%",
      top: "38%",
    },
    processedbase: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      fontWeight: 500,
      marginRight: "10px",
      width: "40%",
      position: "absolute",
      left: "57%",
      top: "52%",
    },
    approvebase: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      fontWeight: 500,
      marginRight: "10px",
      width: "40%",
      position: "absolute",
      left: "57%",
      top: "66%",
    },
    rejectbase: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      fontWeight: 500,
      marginRight: "10px",
      width: "40%",
      position: "absolute",
      left: "8%",
      top: "66%",
    },
    received: {
      backgroundColor: "#28a745",
    },
    sent: {
      backgroundColor: "#ffc107",
    },
    processed: {
      backgroundColor: "#17a2b8",
    },
    approved: {
      backgroundColor: "#007bff",
    },
    rejected: {
      backgroundColor: "#dc3545",
    },
    close: {
      marginTop: "20px",
      backgroundColor: "#6c757d",
    },
  };

  const buttonHoverStyles = {
    received: {
      backgroundColor: "#218838",
    },
    sent: {
      backgroundColor: "#e0a800",
    },
    processed: {
      backgroundColor: "#138496",
    },
    approved: {
      backgroundColor: "#0069d9",
    },
    rejected: {
      backgroundColor: "#c82333",
    },
    close: {
      backgroundColor: "#5a6268",
    },
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <h2>Pending Cheque Payment Approvals</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Amount</th>
            <th>Cheque Date</th>
            <th>Cheque Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingPayments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.customerName}</td>
              <td>₹{payment.paymentApproval.amount}</td>
              <td>{payment.paymentApproval.chequeDate || "N/A"}</td>
              <td>{payment.paymentApproval.chequeNumber || "N/A"}</td>
              <td>{payment.paymentApproval.chequeStatus || "Pending"}</td>
              <td>
                <button
                  onClick={() => openModal(payment)}
                  style={{
                    padding: "10px 15px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Manage Cheque
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for cheque actions */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: "400px",
            height: "300px",
            borderRadius: "10px",
          },
        }}
      >
        {selectedPayment && (
          <>
            <h2>Cheque Actions for {selectedPayment.customerName}</h2>
            <p>
              <strong>Amount:</strong> ₹{selectedPayment.paymentApproval.amount}
            </p>
            <p>
              <strong>Cheque Date:</strong>{" "}
              {selectedPayment.paymentApproval.chequeDate || "N/A"}
            </p>
            <p>
              <strong>Cheque Number:</strong>{" "}
              {selectedPayment.paymentApproval.chequeNumber || "N/A"}
            </p>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() =>
                  handleChequeAction(selectedPayment._id, "received")
                }
                style={{ ...buttonStyles.base, ...buttonStyles.received }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonHoverStyles.received.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonStyles.received.backgroundColor)
                }
              >
                Mark as Received
              </button>
              <button
                onClick={() =>
                  handleChequeAction(selectedPayment._id, "sent_to_bank")
                }
                style={{ ...buttonStyles.sentbase, ...buttonStyles.sent }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonHoverStyles.sent.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonStyles.sent.backgroundColor)
                }
              >
                Sent to Bank
              </button>
              <button
                onClick={() =>
                  handleChequeAction(selectedPayment._id, "processed")
                }
                style={{
                  ...buttonStyles.processedbase,
                  ...buttonStyles.processed,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonHoverStyles.processed.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonStyles.processed.backgroundColor)
                }
              >
                Processed
              </button>
              <button
                onClick={() =>
                  handleChequeAction(selectedPayment._id, "approved")
                }
                ck={() => handleChequeAction(selectedPayment._id, "approved")}
                style={{
                  ...buttonStyles.approvebase,
                  ...buttonStyles.approved,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonHoverStyles.approved.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonStyles.approved.backgroundColor)
                }
              >
                Approve
              </button>
              <button
                onClick={() =>
                  handleChequeAction(selectedPayment._id, "rejected")
                }
                style={{ ...buttonStyles.rejectbase, ...buttonStyles.rejected }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonHoverStyles.rejected.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonStyles.rejected.backgroundColor)
                }
              >
                Reject
              </button>
            </div>
            {rejectionReason && (
              <div style={{ marginTop: "20px" }}>
                <label>
                  <strong>Reason for Rejection:</strong>
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows="3"
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    padding: "5px",
                    marginTop: "5px",
                  }}
                />
              </div>
            )}
            <button
              onClick={closeModal}
              style={{
                marginTop: "70px",
                padding: "10px 15px",
                background: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default PaymentApprovalComponent;
