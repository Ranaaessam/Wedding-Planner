const express = require("express");
const router = express.Router();
const AccountsController = require("../controllers/accountsController");

 router.get("/", AccountsController.getAllAccounts);
 router.put("/",AccountsController.updateAccount);
 router.get("/profile", AccountsController.getAccountByUserID);

 router.post("/Cart", AccountsController.AddToCart);
 router.delete("/Cart", AccountsController.RemoveFromCart);

 router.post("/Favourites", AccountsController.AddToFavourites);
 router.delete("/Favourites", AccountsController.RemoveFromfavourites);




module.exports = router;
