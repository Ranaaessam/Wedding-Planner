 const Users =require("../models/userModel");
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports={getAllUsers}