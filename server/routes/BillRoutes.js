import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import Bill from "../models/Bill.js";
import { getBills } from "../controllers/BillsController.js";
import cron from "node-cron";

import checkRole, { isSalesman } from "../middleware/verifyToken.js";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
//const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Save data to MongoDB
    const savedBills = await Bill.insertMany(data);
    res
      .status(200)
      .json({ message: "File uploaded and data saved", bills: savedBills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading file" });
  }
});
// Save assigned bills to MongoDB
router.post("/assign", async (req, res) => {
  const { salesmanName, selectedBills, companyName } = req.body;
  console.log("Salesman Name:", salesmanName); // Log the salesman's name
  console.log("Selected Bills:", selectedBills);
  try {
    // Update the bills with the assigned salesman
    const updatedBills = await Bill.updateMany(
      { _id: { $in: selectedBills }, companyName }, // Match the selected bills
      { $set: { assignedTo: salesmanName } }, // Assign the salesman
      { multi: true }
    );
    console.log(updatedBills);
    res.status(200).json({ message: "Bills assigneddd successfully" });
  } catch (error) {
    console.error("Error assigning bills", error);
    res.status(500).json({ message: "Failed to assign bills" });
  }
});
// Cron job to delete all bills at 12 AM daily
cron.schedule("0 0 * * *", async () => {
  try {
    await Bill.deleteMany({ assignedTo: { $exists: true } });
    console.log("All bills deleted at midnight.");
  } catch (error) {
    console.error("Error deleting bills at midnight", error);
  }
});

router.get("/", getBills);

router.get("/salesman", async (req, res) => {
  const { salesmanName } = req.query;
  console.log("Fetching bills for salesman:", salesmanName); // Add this for debugging
  try {
    const bills = await Bill.find({ assignedTo: salesmanName });
    console.log("Bills found:", bills);
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bills" });
  }
});

// // Fetch wallet and payment summary for a salesman

router.post("/update-wallet-summary", async (req, res) => {
  const { salesmanName, amount, paymentMode } = req.body;

  try {
    const bill = await Bill.findOne({ salesmanName });
    if (bill) {
      // Sum the new amount into the existing wallet and payment summary fields in database
      bill.paymentApproval.wallet =
        (bill.paymentApproval.wallet || 0) + Number(amount);
      bill.paymentApproval.paymentSummary[paymentMode] =
        (bill.paymentApproval.paymentSummary[paymentMode] || 0) +
        Number(amount);

      await bill.save();
      res.status(200).json({
        success: true,
        wallet: bill.paymentApproval.wallet,
        paymentSummary: bill.paymentApproval.paymentSummary,
        message: "Wallet updated successfully",
      });
    } else {
      res.status(404).json({ message: "Salesman not found" });
    }
  } catch (error) {
    console.error("Error updating wallet and payment summary:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/update-wallet-summary", async (req, res) => {
//   const { salesmanName, amount, paymentMode } = req.body;

//   try {
//     const bill = await Bill.findOne({ salesmanName });
//     if (bill) {
//       // Sum the new amount into the existing wallet and payment summary fields in database
//       bill.paymentApproval.wallet = (bill.paymentApproval.wallet || 0) + amount;

//       bill.paymentApproval.paymentSummary[paymentMode] =
//         (bill.paymentApproval.paymentSummary[paymentMode] || 0) + amount;

//       await bill.save();
//       res.status(200).json({
//         success: true,
//         wallet: bill.paymentApproval.wallet,
//         paymentSummary: bill.paymentApproval.paymentSummary,
//         message: "Wallet updated successfully",
//       });
//     } else {
//       res.status(404).json({ message: "Salesman not found" });
//     }
//   } catch (error) {
//     console.error("Error updating wallet and payment summary:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Fetch wallet and payment summary for all salesmen
router.get("/salesmen/wallet-summaries", async (req, res) => {
  try {
    const salesmenData = await Bill.find(
      {},
      "salesmanName paymentApproval.wallet paymentApproval.paymentSummary"
    );
    const formattedData = salesmenData.map((bill) => ({
      salesmanName: bill.salesmanName,
      wallet: bill.paymentApproval.wallet,
      paymentSummary: bill.paymentApproval.paymentSummary,
    }));
    res.status(200).json(formattedData);
  } catch (error) {
    console.error(
      "Error fetching all salesmen wallet and payment summaries:",
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { billId, amount, paymentMode, salesmanName } = req.body;

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    // Find the bill by ID
    const bill = await Bill.findById(billId);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // Subtract the amount from the outstandingAmount
    bill.outstandingAmount -= amount;

    // If the bill is fully paid, update the status
    if (bill.outstandingAmount <= 0) {
      bill.status = "fully-paid";
      bill.outstandingAmount = 0; // Ensure no negative outstanding amounts
    }

    // Save the updated bill
    await bill.save();

    // Update wallet and payment summary
    const walletUpdate = await Bill.updateOne(
      { assignedTo: salesmanName },
      {
        $inc: {
          wallet: amount,
          [`paymentSummary.${paymentMode}`]: amount,
        },
      }
    );

    if (walletUpdate.modifiedCount === 0) {
      return res
        .status(500)
        .json({ error: "Failed to update the wallet and payment summary" });
    }

    res.status(200).json({ message: "Bill updated successfully", bill });
  } catch (error) {
    console.error("Error updating bill:", error); // Log the error for debugging
    res.status(500).json({ message: "Error updating bill", error });
  }
});
router.post("/requestPaymentApproval", async (req, res) => {
  try {
    const {
      billId,
      paymentMode,
      amount,
      // proof,
      chequeNumber,
      chequeDate,
      upiTransactionId,
    } = req.body;
    console.log(req.body);
    const bill = await Bill.findById(billId);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // Store the payment request for admin approval
    bill.paymentApproval = {
      status: "pending",
      paymentMode,
      amount,
      // proof, // File proof
      chequeNumber,
      chequeDate,
      upiTransactionId,
    };

    await bill.save();
    res.status(200).json({ message: "Payment submitted for approval", bill });
  } catch (error) {
    console.error("Error submitting payment for approval", error);
    res.status(500).json({ message: "Error submitting payment for approval" });
  }
});
router.get("/admin/paymentsPending", async (req, res) => {
  try {
    const pendingPayments = await Bill.find({
      "paymentApproval.status": "pending",
    });
    res.status(200).json(pendingPayments);
  } catch (error) {
    console.error("Error fetching pending payments", error);
    res.status(500).json({ message: "Error fetching pending payments" });
  }
});
router.post("/admin/approvePayment", async (req, res) => {
  const { billId, isApproved } = req.body;

  try {
    const bill = await Bill.findById(billId);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    if (isApproved) {
      // Update bill as approved and mark it as paid
      bill.outstandingAmount = 0;
      bill.status = "fully-paid";
      bill.paymentApproval.status = "approved";
    } else {
      // If rejected, mark payment approval as rejected
      bill.paymentApproval.status = "rejected";
    }

    await bill.save();

    const message = isApproved
      ? "Payment approved successfully."
      : "Payment rejected successfully.";
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error approving payment:", error);
    res.status(500).json({ message: "Error approving payment." });
  }
});
router.post("/addnew", async (req, res) => {
  try {
    const newBill = new Bill({
      companyName: req.body.companyName,
      salesmanName: req.body.salesmanName,
      customerName: req.body.customerName,
      invoiceNumber: req.body.invoiceNumber,
      invoiceDate: req.body.invoiceDate,
      totalAmount: req.body.totalAmount,
      outstandingAmount: req.body.outstandingAmount,
    });

    // Save the bill to MongoDB
    await newBill.save();
    res.status(201).json(newBill);
    console.log("Bills", newBill);
  } catch (error) {
    res.status(500).json({ error: "Error saving the bill" });
  }
});
// Route to get all assigned bills
router.get("/assigned", async (req, res) => {
  try {
    const assignedBills = await Bill.find({ assignedTo: { $exists: true } });
    res.status(200).json(assignedBills);
  } catch (error) {
    console.error("Error fetching assigned bills", error);
    res.status(500).json({ message: "Error fetching assigned bills" });
  }
});
// Add this route in BillRoutes.js
// Route to get filtered bills
router.get("/admin/filter", async (req, res) => {
  const { companyName } = req.query;

  // Define date ranges for the columns (in days)
  const dateRanges = {
    "0-7": [0, 7],
    "8-14": [8, 14],
    "15-21": [15, 21],
    "22-28": [22, 28],
  };

  try {
    // Fetch all bills from the database
    let query = {};
    if (companyName) {
      query.companyName = companyName; // Apply company name filter if present
    }

    const allBills = await Bill.find(query);

    // Create columns based on date ranges
    let columns = {
      "0-7": [],
      "8-14": [],
      "15-21": [],
      "22-28": [],
    };

    // Current date for comparison
    const currentDate = new Date();

    // Categorize bills based on age
    allBills.forEach((bill) => {
      const invoiceDate = new Date(bill.invoiceDate);
      const ageInDays = Math.floor(
        (currentDate - invoiceDate) / (1000 * 60 * 60 * 24)
      );

      // Check which column the bill belongs to based on its age
      for (const range in dateRanges) {
        const [min, max] = dateRanges[range];
        if (ageInDays >= min && ageInDays <= max) {
          columns[range].push(bill);
          break;
        }
      }
    });

    res.status(200).json(columns); // Send categorized bills to the frontend
  } catch (error) {
    console.error("Error fetching bills", error);
    res.status(500).json({ message: "Error fetching bills" });
  }
});
// DELETE endpoint to delete an invoice
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Bill.findByIdAndDelete(id);
    res.status(200).send({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Error deleting bill" });
  }
});

// PUT endpoint to update an invoice
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedBill = await Bill.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).send(updatedBill);
  } catch (error) {
    res.status(500).send({ error: "Error updating bill" });
  }
});

export default router;
