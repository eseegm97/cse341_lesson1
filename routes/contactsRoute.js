const express = require("express");
const { getAllContacts, getContactById } = require("../controllers/contactsController");

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getContactById);

module.exports = router;
