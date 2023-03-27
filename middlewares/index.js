const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationRegister,
  validationUpdateSubscription,
  validationVeryfyEmail,
} = require("./validations");
const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");
const auth = require("./auth");
const upload = require("./upload");

module.exports = {
  validationUpdateContact,
  validationAddContact,
  validationUpdateStatusContact,
  validationRegister,
  validationUpdateSubscription,
  validationVeryfyEmail,
  ctrlWrapper,
  isValidId,
  auth,
  upload,
};
