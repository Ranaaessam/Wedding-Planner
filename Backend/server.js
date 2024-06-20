const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Rana123:Rana123@cluster0.tzw4ssh.mongodb.net/weddingPlanner"
);

const UsersRouters = require("./routes/users");
const VenuesRouters = require("./routes/venues");
const SuppliersRouters = require("./routes/suppliers");
const ReviewsRouters = require("./routes/reviews");

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use("/users", UsersRouters);
app.use("/venues", VenuesRouters);
app.use("/suppliers", SuppliersRouters);
app.use("/reviews", ReviewsRouters);
