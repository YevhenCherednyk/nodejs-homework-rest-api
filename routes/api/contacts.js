const express = require("express");

const {
  getAll,
  getById,
  add,
  remove,
  updateById,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", remove);

router.put("/:contactId", updateById);

module.exports = router;
