import express from "express";
import Bill from "../models/Bill.js";
const router = express.Router();

// Update cheque status
router.post("/action", async (req, res) => {
  const { billId, action } = req.body;

  try {
    const bill = await Bill.findById(billId);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // Perform action based on the received action type
    if (action === "received") {
      bill.paymentApproval.chequeStatus = "received";
    } else if (action === "sent_to_bank") {
      bill.paymentApproval.chequeStatus = "sent_to_bank";
    } else if (action === "processed") {
      bill.paymentApproval.chequeStatus = "processed";
      bill.dueAmount = 0; // Mark the bill as fully paid
      bill.status = "fully-paid";
    }

    await bill.save();
    res.status(200).json({ message: `Cheque marked as ${action}.` });
  } catch (error) {
    console.error("Error processing cheque action:", error);
    res.status(500).json({ message: "Error processing cheque action" });
  }
});

export default router;
