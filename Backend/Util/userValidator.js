const Ajv = require("ajv").default;
const ajv = new Ajv();

const Schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    },
    password: { type: "string" },
  },
  required: ["name", "password", "email"],
};

module.exports = ajv.compile(Schema);
