import express from "express";
import Salesman from "../models/Salesman.js";

const router = express.Router();

// Add a new salesman
router.post("/add", async (req, res) => {
  try {
    const { name, phone, address, password } = req.body;
    const newSalesman = new Salesman({ name, phone, address, password });
    await newSalesman.save();
    res.status(201).json(newSalesman);
  } catch (err) {
    res.status(500).json({ error: "Failed to add salesman" });
  }
});

// Edit a salesman
router.put("/edit/:id", async (req, res) => {
  try {
    const updatedSalesman = await Salesman.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSalesman);
  } catch (err) {
    res.status(500).json({ error: "Failed to update salesman" });
  }
});

// Delete a salesman
router.delete("/delete/:id", async (req, res) => {
  try {
    await Salesman.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Salesman deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete salesman" });
  }
});

// Get all salesmen
router.get("/all", async (req, res) => {
  try {
    const salesmen = await Salesman.find();
    res.status(200).json(salesmen);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch salesmen" });
  }
});

export default router;
