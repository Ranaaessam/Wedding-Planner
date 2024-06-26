const Account = require("../models/accountsModel");

const { google } = require("googleapis");
const credentials = require("../credentials.json");

const User = require("../models/userModel");
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

const getUserNamesByUserID = async (req, res) => {
  const { userId } = req.query;
  try {
    const account = await Account.findOne({
      $or: [{ user1Id: userId }, { user2Id: userId }],
    });

    const user1 = await User.findById(account.user1Id);
    const user2 = await User.findById(account.user2Id);
    if (account) {
      res.status(200).json({
        user1Name: user1?.name,
        user2Name: user2?.name,
      });
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

const clearCart = async (req, res) => {
  try {
    const accountId = req.query.accountId;
    const account = await Account.findByIdAndUpdate(accountId, { cart: [] });
    res.json("Cart cleared successfully!");
  } catch (err) {
    res.status(500).json({ message: err.message });
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

const authClient = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key.replace(/\\n/g, "\n"),
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const service = google.sheets({ version: "v4", auth: authClient });

const getGuestList = async (req, res) => {
  try {
    console.log("Authorizing...");
    const startAuth = Date.now();
    await authClient.authorize();
    const endAuth = Date.now();
    console.log(`Authorization took ${endAuth - startAuth} ms`);

    console.log("Fetching rows...");
    const startFetch = Date.now();
    const response = await service.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId: "1s6einhareR_FoDQlFyfVe8xfhDSPpMQF-6RNc4n1EWM",
      range: "A:H",
    });
    const endFetch = Date.now();
    console.log(`Fetching rows took ${endFetch - startFetch} ms`);

    const answers = [];

    const rows = response.data.values;

    if (rows && rows.length) {
      rows.shift();

      for (const row of rows) {
        answers.push({
          timeStamp: row[0],
          weddingId: row[1],
          groomName: row[2],
          brideName: row[3],
          date: row[4],
          location: row[5],
          enteredName: row[6],
          note: row[7],
        });
      }
    } else {
      console.log("No data found.");
    }
    res.json(answers);
  } catch (error) {
    process.exit(1);
  }
};

module.exports = {
  getAllAccounts,
  getAccountByUserID,
  AddToCart,
  clearCart,
  RemoveFromCart,
  AddToFavourites,
  RemoveFromfavourites,
  updateAccount,
  getGuestList,
  getAllFavouritesByAccountID,
  getUserNamesByUserID,
};
