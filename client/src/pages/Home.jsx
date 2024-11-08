import React, { useEffect, useRef, useState } from "react";
import { get, post } from "../services/ApiEndpoint";
import BillTable from "../component/BillTable";
import PaymentModal from "../component/PaymentModal";
import toast from "react-hot-toast";
import SaleNavbar from "../component/SaleNavbar";
import TotalCollection from "../component/TotalCollection";

const styles = {
  container: {
    maxWidth: "1200px",
    marginTop: "10%",
    marginBottom: "5%",
    marginLeft: "16%",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
};

const Home = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState(0);
  const [proof, setProof] = useState(null);
  const [chequeNumber, setChequeNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [salesmanName, setSalesmanName] = useState("");
  const [paymentSummary, setPaymentSummary] = useState({
    cash: 0,
    upi: 0,
    cheque: 0,
  });

  useEffect(() => {
    const name = localStorage.getItem("salesmanName");

    if (name) {
      setSalesmanName(name);

      // Fetch new salesman data after login
      fetchWalletAndSummary(name);
      fetchBills(name);

      // Clear local storage when a new login happens
      localStorage.removeItem("bills");
      localStorage.removeItem("wallet");
      localStorage.removeItem("paymentSummary");
    } else {
      toast.error("No salesman logged in. Please log in.");
    }
  }, []);

  const fetchBills = async (salesmanName) => {
    try {
      const response = await get(
        `/api/bills/salesman?salesmanName=${salesmanName}`
      );
      setBills(response.data);
      localStorage.setItem("bills", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const fetchWalletAndSummary = async (salesmanName) => {
    try {
      const response = await get(
        `/api/bills/salesman/wallet-summary?salesmanName=${salesmanName}`
      );
      setWallet(response.data.wallet);
      setPaymentSummary(response.data.paymentSummary);

      localStorage.setItem("wallet", JSON.stringify(response.data.wallet));
      localStorage.setItem(
        "paymentSummary",
        JSON.stringify(response.data.paymentSummary)
      );
    } catch (error) {
      console.error("Error fetching wallet and payment summary:", error);
    }
  };

  const openPaymentModal = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBill(null);
    setPaymentMode("");
    setAmount(0);
    setProof(null);
    setChequeNumber("");
  };

  const handlePayment = async () => {
    if (!selectedBill || amount <= 0) return;

    const newDueAmount = selectedBill.outstandingAmount - amount;

    if (newDueAmount < 0) {
      toast.error("Payment amount exceeds the due amount.");
      return;
    }

    try {
      if (paymentMode === "cash") {
        await post("/api/bills/update-wallet-summary", {
          billId: selectedBill._id,
          amount,
          paymentMode,
          salesmanName,
        });
        setWallet((prevWallet) => prevWallet + Number(amount));

        // Update the bills array to reflect the new outstanding amount
        setBills((prevBills) => {
          const updatedBills = prevBills.map((bill) => {
            if (bill._id === selectedBill._id) {
              return {
                ...bill,
                outstandingAmount: newDueAmount,
                status: newDueAmount === 0 ? "fully-paid" : bill.status,
              };
            }
            return bill;
          });
          // Remove fully-paid bills from the list
          const nonZeroBills = updatedBills.filter(
            (bill) => bill.outstandingAmount > 0
          );
          localStorage.setItem("bills", JSON.stringify(nonZeroBills));
          return nonZeroBills;
        });

        const response = await post("/api/bills/update-wallet-summary", {
          salesmanName,
          amount,
          paymentMode: "cash",
        });

        if (response.data.success) {
          // Use updated data from the server to refresh state
          setPaymentSummary(response.data.paymentSummary);
          setWallet(response.data.wallet);

          toast.success("Cash payment successful");
        }
      } else {
        const formData = new FormData();
        formData.append("billId", selectedBill._id);
        formData.append("paymentMode", paymentMode);
        formData.append("amount", amount);
        if (proof) {
          formData.append("proof", proof);
        }
        if (paymentMode === "cheque") {
          formData.append("chequeNumber", chequeNumber);
        }

        await post("/api/bills/requestPaymentApproval", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Update the payment summary for non-cash payments
        setPaymentSummary((prevSummary) => ({
          ...prevSummary,
          [paymentMode]: prevSummary[paymentMode] + Number(amount),
        }));

        toast.success("Payment sent for approval");

        // Remove the bill from the list after sending for approval
        setBills((prevBills) =>
          prevBills.filter((bill) => bill._id !== selectedBill._id)
        );
      }
      closeModal();
    } catch (error) {
      console.error("Error handling payment:", error);
      toast.error("Error handling payment. Please try again.");
    }
  };

  const handleFileUpload = (e) => {
    setProof(e.target.files[0]);
  };

  return (
    <>
      <SaleNavbar />
      <div style={styles.container}>
        <h1 style={{ paddingLeft: "27%", background: "red" }}>
          Salesman Dashboard
        </h1>
        <h2
          style={{
            background: "#00BFFF",
            marginLeft: "75%",
            marginRight: "2%",
          }}
        >
          Wallet: ₹{wallet}
        </h2>
        <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
          <h3>Payment Summary</h3>
          <p>Cash Collected: ₹{paymentSummary.cash}</p>
          <p>UPI Collected: ₹{paymentSummary.upi}</p>
          <p>Cheque Collected: ₹{paymentSummary.cheque}</p>
        </div>

        <BillTable bills={bills} onOpenModal={openPaymentModal} />
        <PaymentModal
          isOpen={isModalOpen}
          bill={selectedBill}
          paymentMode={paymentMode}
          setPaymentMode={setPaymentMode}
          amount={amount}
          setAmount={setAmount}
          proof={proof}
          handleFileUpload={handleFileUpload}
          chequeNumber={chequeNumber}
          setChequeNumber={setChequeNumber}
          handlePayment={handlePayment}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

export default Home;
