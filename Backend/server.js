const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const mongoose = require("mongoose");

const UsersRouters = require("./routes/users");
const SuppliersRouters = require("./routes/suppliers");
const ReviewsRouters = require("./routes/reviews");
const adminRoutes = require("./routes/admin");
const accountRoutes = require("./routes/account");
const ordersRoutes = require("./routes/orders");
const reservations = require("./routes/reservation");
const complaintsRoutes = require("./routes/complaints");
mongoose.connect(
  "mongodb+srv://Rana123:Rana123@cluster0.tzw4ssh.mongodb.net/weddingPlanner"
);
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  exposedHeaders: ["x-auth-token"],
};
app.use(express.json());
app.use(cors(corsOptions));
app.use("/users", UsersRouters);
app.use("/suppliers", SuppliersRouters);
app.use("/reviews", ReviewsRouters);
app.use("/admin", adminRoutes);
app.use("/account", accountRoutes);
app.use("/orders", ordersRoutes);
app.use("/reservation", reservations);
app.use("/complaints", complaintsRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
