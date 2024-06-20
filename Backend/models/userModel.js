const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: validator.isEmail,
        message: props => `${props.value} is not a valid email!`
      }
  },
  password: {
    type: String,
    required: true
  }
});
exports.User= mongoose.model("users",userSchema);
