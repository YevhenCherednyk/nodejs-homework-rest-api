const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationRegister,
} = require("./validations");
const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");

module.exports = {
  validationUpdateContact,
  validationAddContact,
  validationUpdateStatusContact,
  validationRegister,
  ctrlWrapper,
  isValidId,
};
