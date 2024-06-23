const Account = require("../models/accountsModel");
const getAllAccounts = async (req, res) => {
    try {
      const accounts = await Account.find();
      res.json(accounts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getAccountByUserID = async (req, res) => {

    // const token = req.header('x-auth-token');
    // if (!token) return res.status(401).send('Access denied. No token provided.');
    //  const userId =jwt.verify(token, "WeddingPlannerSecretKey");

    const { userId } = req.query;
    try {
      const accounts = await Account.find({
        $or: [
          { user1Id: userId },
          { user2Id: userId }
        ]
      });
  
      if (accounts.length > 0) {
        res.status(200).json(accounts);
      } else {
        res.status(404).json({ message: "No accounts found for this user" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  //cart
  const AddToCart = async (req, res) => {
    const {accountId} = req.query; 
    const newCartItem = req.body; 
  
    try {
      const account = await Account.findByIdAndUpdate(
        accountId,
        { $push: { cart: newCartItem } }, // Push the new item to the cart array
        { new: true, useFindAndModify: false } // Return the updated document
      );
  
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
  
      res.status(200).json(account);
    } catch (err) {
      console.error("Error adding to cart:", err);
      res.status(500).json({ message: "An error occurred while adding to the cart", error: err.message });
    }
  };
  
  const RemoveFromCart = async (req, res) => {
    const accountId = req.query.accountId;
    const itemId = req.query.itemId; 
  
    try {
      
      const account = await Account.findByIdAndUpdate(
        accountId,
        { $pull: { cart: { _id: itemId } } }, 
        { new: true, useFindAndModify: false } 
      );
  
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
  
      res.status(200).json(account);
    } catch (err) {
      console.error("Error removing from cart:", err);
      res.status(500).json({ message: "An error occurred while removing from the cart", error: err.message });
    }
  };
   //favourites
   const AddToFavourites= async (req, res) => {
    const {accountId} = req.query; 
    const newFavouriteItem = req.body; 
  
    try {
      const account = await Account.findByIdAndUpdate(
        accountId,
        { $push: { favourites: newFavouriteItem } }, 
        { new: true, useFindAndModify: false } // Return the updated document
      );
  
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
  
      res.status(200).json(account);
    } catch (err) {
      console.error("Error adding to favourites:", err);
      res.status(500).json({ message: "An error occurred while adding to the favourites", error: err.message });
    }
  };

  const RemoveFromfavourites = async (req, res) => {
    const accountId = req.query.accountId;
    const itemId = req.query.itemId; 
  
    try {
      
      const account = await Account.findByIdAndUpdate(
        accountId,
        { $pull: { favourites: { _id: itemId } } }, 
        { new: true, useFindAndModify: false } 
      );
  
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
  
      res.status(200).json(account);
    } catch (err) {
      console.error("Error removing from favourites:", err);
      res.status(500).json({ message: "An error occurred while removing from the favourites", error: err.message });
    }
  };

  //update
const updateAccount = async (req, res) => {
  const accountId = req.query.accountId; 
  const { weddingdate, location, image } = req.body; 

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      {
        weddingdate,
        location,
        image
      },
      { new: true, useFindAndModify: false } 
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json(updatedAccount);
  } catch (err) {
    console.error("Error updating account:", err);
    res.status(500).json({ message: "An error occurred while updating the account", error: err.message });
  }
};


module.exports = {getAllAccounts ,
                  getAccountByUserID,
                  AddToCart,
                  RemoveFromCart,
                  AddToFavourites,
                  RemoveFromfavourites,
                  updateAccount
                  
};