const express = require("express");
const { getAllContacts, getContactById, createContact, updateContact, deleteContact } = require("../controllers/contactsController");

const router = express.Router();

/**
 * #swagger.tags = ['Contacts']
 * #swagger.summary = 'Get all contacts'
 * #swagger.description = 'Retrieve a list of all contacts from the database'
 * #swagger.responses[200] = { description: 'Successfully retrieved all contacts' }
 * #swagger.responses[500] = { description: 'Internal server error' }
 */
router.get("/", getAllContacts);

/**
 * #swagger.tags = ['Contacts']
 * #swagger.summary = 'Get contact by ID'
 * #swagger.description = 'Retrieve a specific contact by their ID'
 * #swagger.parameters['id'] = { description: 'Contact ID', required: true, type: 'string' }
 * #swagger.responses[200] = { description: 'Successfully retrieved contact' }
 * #swagger.responses[404] = { description: 'Contact not found' }
 * #swagger.responses[500] = { description: 'Internal server error' }
 */
router.get("/:id", getContactById);

/**
 * #swagger.tags = ['Contacts']
 * #swagger.summary = 'Create a new contact'
 * #swagger.description = 'Add a new contact to the database'
 * #swagger.parameters['body'] = { in: 'body', description: 'Contact information' }
 * #swagger.responses[201] = { description: 'Contact successfully created' }
 * #swagger.responses[400] = { description: 'Bad request' }
 * #swagger.responses[500] = { description: 'Internal server error' }
 */
router.post("/", createContact);

/**
 * #swagger.tags = ['Contacts']
 * #swagger.summary = 'Update an existing contact'
 * #swagger.description = 'Update contact information by ID'
 * #swagger.parameters['id'] = { description: 'Contact ID', required: true, type: 'string' }
 * #swagger.parameters['body'] = { in: 'body', description: 'Updated contact information' }
 * #swagger.responses[200] = { description: 'Contact successfully updated' }
 * #swagger.responses[400] = { description: 'Bad request' }
 * #swagger.responses[404] = { description: 'Contact not found' }
 * #swagger.responses[500] = { description: 'Internal server error' }
 */
router.put("/:id", updateContact);

/**
 * #swagger.tags = ['Contacts']
 * #swagger.summary = 'Delete a contact'
 * #swagger.description = 'Remove a contact from the database by ID'
 * #swagger.parameters['id'] = { description: 'Contact ID', required: true, type: 'string' }
 * #swagger.responses[200] = { description: 'Contact successfully deleted' }
 * #swagger.responses[404] = { description: 'Contact not found' }
 * #swagger.responses[500] = { description: 'Internal server error' }
 */
router.delete("/:id", deleteContact);

module.exports = router;
