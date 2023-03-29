const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationRegister,
  validationUpdateSubscription,
  validationVerifyEmail,
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
  validationVerifyEmail,
  ctrlWrapper,
  isValidId,
  auth,
  upload,
};
