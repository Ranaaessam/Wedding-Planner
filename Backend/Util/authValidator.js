

const Ajv = require("ajv").default;
const ajv = new Ajv();

const Schema = {
    "type": "object",
    "properties": {
        "email": { 
            "type": "string",
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        "password": { "type": "string" }
    },
    "required": [ "password", "email"]
};

module.exports = ajv.compile(Schema);