import React, { useEffect, useState } from "react";
import { get } from "../services/ApiEndpoint";

const SupervisorSummary = () => {
  const [summary, setSummary] = useState({
    cash: 0,
    cheque: 0,
    upi: 0,
  });

  useEffect(() => {
    // Fetch updated summary from the backend whenever the page loads
    const fetchSummary = async () => {
      try {
        const response = await get("/api/supervisor/summary");
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching supervisor summary:", error);
      }
    };

    fetchSummary();

    // Optionally: Add WebSocket or polling mechanism to update summary in real-time
  }, []);

  return (
    <div>
      <h3>Payment Summary</h3>
      <p>Cash Collected: ₹{summary.cash}</p>
      <p>Cheque Collected: ₹{summary.cheque}</p>
      <p>UPI Collected: ₹{summary.upi}</p>
    </div>
  );
};

export default SupervisorSummary;
