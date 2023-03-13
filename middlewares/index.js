const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require("./validations");
const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");

module.exports = {
  validationUpdateContact,
  validationAddContact,
  validationUpdateStatusContact,
  ctrlWrapper,
  isValidId,
};
