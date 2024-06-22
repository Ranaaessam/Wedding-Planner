const validator = require("../Util/userValidator");
module.exports = (req, res, next) => {
  let valid = validator(req.body);
  console.log(valid);
  if (valid) {
    req.valid = 1;
    next();
  } else res.status(403).send("forbidden command");
};
