const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.bool(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  addSchema,
  updateStatusSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
