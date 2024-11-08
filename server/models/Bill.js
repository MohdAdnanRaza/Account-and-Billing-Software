import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  companyName: String,
  salesmanName: String,
  customerName: String,
  receiptNumber: String,
  invoiceNumber: String,
  invoiceDate: Date,
  totalAmount: Number,
  outstandingAmount: Number,
  assignedTo: String,
  proofUrl: String,
  status: {
    type: String,
    default: "pending", // or "fully-paid"
  },

  paymentApproval: {
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    wallet: { type: Number, default: 0 },
    paymentSummary: {
      cash: { type: Number, default: 0 },
      upi: { type: Number, default: 0 },
      cheque: { type: Number, default: 0 },
    },
  },
  paymentMode: String,
  amount: Number,
  chequeNumber: String, // Optional
  chequeDate: Date,
  upiTransactionId: String, // Optional
  // proof: String, // File path or URL
});

const Bill = mongoose.model("Bill", billSchema);
export default Bill;
