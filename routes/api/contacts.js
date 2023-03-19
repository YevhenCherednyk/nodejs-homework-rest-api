const express = require("express");

const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  ctrlWrapper,
  isValidId,
  auth,
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

router.get("/", auth, ctrlWrapper(getAllContacts));

router.get("/:contactId", auth, isValidId, ctrlWrapper(getContactById));

router.post(
  "/",
  auth,
  validationAddContact(schemas.addSchema),
  ctrlWrapper(addContact)
);

router.delete("/:contactId", auth, isValidId, ctrlWrapper(removeContact));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validationUpdateContact(schemas.addSchema),
  ctrlWrapper(updateContactById)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validationUpdateStatusContact(schemas.updateStatusSchema),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
