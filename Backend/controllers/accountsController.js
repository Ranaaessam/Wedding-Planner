const Account = require("../models/accountsModel");
const { isValidObjectId } = require("mongoose");
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
  // const userId = jwt.verify(token, "WeddingPlannerSecretKey");

  const { userId } = req.query;
  try {
    const account = await Account.findOne({
      $or: [{ user1Id: userId }, { user2Id: userId }],
    });

    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "No account found for this user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//cart
const AddToCart = async (req, res) => {
  const { accountId } = req.query;
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
    res.status(500).json({
      message: "An error occurred while adding to the cart",
      error: err.message,
    });
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
    res.status(500).json({
      message: "An error occurred while removing from the cart",
      error: err.message,
    });
  }
};

const getAllFavouritesByAccountID = async (req, res) => {
  try {
    const { accountId } = req.query;
    const favourites = await Account.findById(accountId).select("favourites");
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//favourites
const AddToFavourites = async (req, res) => {
  const { accountId } = req.query;
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
    res.status(500).json({
      message: "An error occurred while adding to the favourites",
      error: err.message,
    });
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
    res.status(500).json({
      message: "An error occurred while removing from the favourites",
      error: err.message,
    });
  }
};

//update
const updateAccount = async (req, res) => {
  try {
    const accountId = req.query.accountId;
    let newAccount = req.body.account;

    if (!isValidObjectId(accountId)) {
      return res.status(400).json({ message: "Invalid account id" });
    }
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    let updatedAccount = { ...account.toObject(), ...newAccount };
    await Account.findByIdAndUpdate(accountId, updatedAccount);
    return res.json({ message: "Account updated" });
  } catch (err) {
    console.error("Error updating account:", err);
    res.status(500).json({
      message: "An error occurred while updating the account",
      error: err.message,
    });
  }
};

module.exports = {
  getAllAccounts,
  getAccountByUserID,
  AddToCart,
  RemoveFromCart,
  AddToFavourites,
  RemoveFromfavourites,
  updateAccount,
  getAllFavouritesByAccountID,
};
