import Bill from "../models/Bill.js";

export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find(); // Fetch all bills from the database
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bills" });
  }
};
