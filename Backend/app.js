// index.js
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const UsersRouters=require("./routes/users");


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
mongoose.connect(
  "mongodb+srv://Rana123:Rana123@cluster0.tzw4ssh.mongodb.net/weddingPlanner"
);

app.use(express.json());
app.use("/users",UsersRouters);
