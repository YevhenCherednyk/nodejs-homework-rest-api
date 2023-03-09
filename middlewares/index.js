const {
  validationAddContact,
  validationUpdateContact,
} = require("./validations");
const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");

module.exports = {
  validationUpdateContact,
  validationAddContact,
  ctrlWrapper,
  isValidId,
};
