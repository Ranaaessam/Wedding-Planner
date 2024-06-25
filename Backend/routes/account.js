const express = require("express");
const router = express.Router();
const AccountsController = require("../controllers/accountsController");

router.get("/", AccountsController.getAllAccounts);
router.patch("/", AccountsController.updateAccount);
router.get("/profile", AccountsController.getAccountByUserID);

router.post("/Cart", AccountsController.AddToCart);
router.delete("/Cart", AccountsController.RemoveFromCart);

router.post("/Favourites", AccountsController.AddToFavourites);
router.delete("/Favourites", AccountsController.RemoveFromfavourites);
router.get("/Favourites", AccountsController.getAllFavouritesByAccountID);

module.exports = router;
