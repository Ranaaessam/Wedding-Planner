const Reservation = require("../models/reservationModel"); 
const getAllreservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createReservation = async (req, res) => {
  try {
    const {date,supplierID,accountID} = req.body;
    const newReservation = new Reservation({
        date,supplierID,accountID
    });
    await newReservation.save();
    res.status(201).json(newReservation );
  } catch (err) {
   
    res.status(500).json({error: err.message });
  }
};

const getReservationBySupplierID = async (req, res) => {
  const { SupplierID } = req.params;
  try {
    const reservations = await Reservation.find({ supplierID: SupplierID }); 
    if (reservations.length === 0) {
      return res.status(404).json({ message: 'No reservation found for this supplier.' });
    }
    res.status(200).json(reservations);
  } catch (err) {
    console.error('Error fetching reservation by "SupplierID" field:', err);
    res.status(500).json({ message: 'An error occurred while fetching reservation.', error: err.message });
  }
};


module.exports = { getAllreservations ,
                   createReservation,
                   getReservationBySupplierID
};
