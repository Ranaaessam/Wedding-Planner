const { isValidObjectId } = require("mongoose");
const Complaint = require("../models/complaintModel");

const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({});
    return res.status(200).json(complaints);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    return res.status(201).json({ message: "Complaint created successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getComplaints,
  createComplaint,
};
