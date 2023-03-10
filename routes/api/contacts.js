const express = require("express");

const {
  validationAddContact,
  validationUpdateContact,
  ctrlWrapper,
  isValidId,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", isValidId, ctrlWrapper(getContactById));

router.post(
  "/",
  validationAddContact(schemas.addSchema),
  ctrlWrapper(addContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(removeContact));

router.put(
  "/:contactId",
  isValidId,
  validationUpdateContact(schemas.addSchema),
  ctrlWrapper(updateContactById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationUpdateContact(schemas.updateStatusSchema),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
