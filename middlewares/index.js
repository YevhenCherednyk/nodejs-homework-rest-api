const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationRegister,
  validationUpdateSubscription,
} = require("./validations");
const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");
const auth = require("./auth");

module.exports = {
  validationUpdateContact,
  validationAddContact,
  validationUpdateStatusContact,
  validationRegister,
  validationUpdateSubscription,
  ctrlWrapper,
  isValidId,
  auth,
};
