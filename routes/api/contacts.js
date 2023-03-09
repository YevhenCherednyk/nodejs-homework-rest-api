const express = require("express");

const {
  validationAddContact,
  validationUpdateContact,
  ctrlWrapper,
} = require("../../middlewares");
const contactSchema = require("../../schemas/contact");

const {
  getAll,
  getById,
  add,
  remove,
  updateById,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", ctrlWrapper(getAll));

router.get("/:contactId", ctrlWrapper(getById));

router.post("/", validationAddContact(contactSchema), ctrlWrapper(add));

router.delete("/:contactId", ctrlWrapper(remove));

router.put(
  "/:contactId",
  validationUpdateContact(contactSchema),
  ctrlWrapper(updateById)
);

module.exports = router;
