const express = require("express");
const app = express();
const port = 3000;

const cors = require('cors');



app.use(cors());
 

const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://Rana123:Rana123@cluster0.tzw4ssh.mongodb.net/weddingPlanner"
);
app.use(express.json());
const UsersRouters = require("./routes/users");
const VenuesRouters = require("./routes/venues");
const SuppliersRouters = require("./routes/suppliers");
const ReviewsRouters = require("./routes/reviews");

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const corsOptions = {
  origin: "*", //nnd Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specified HTTP methods
  allowedHeaders: "*",
  exposedHeaders: ["x-auth-token"], // Allow specified headers
};
app.use(cors(corsOptions));
``;
app.use("/users", UsersRouters);
app.use("/venues", VenuesRouters);
app.use("/suppliers", SuppliersRouters);
app.use("/reviews", ReviewsRouters);