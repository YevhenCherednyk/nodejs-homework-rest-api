const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
});

module.exports = schema;
