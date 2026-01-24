const { ObjectId } = require("mongodb");
const { connectDB } = require("../config/db");

async function getAllContacts(req, res) {
    try {
        const database = await connectDB();
        const contacts = await database.collection("Contacts").find({}).toArray();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getContactById(req, res) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Contact not found or invalid ID" });
        }

        const database = await connectDB();
        const contact = await database.collection("Contacts").findOne({
            _id: new ObjectId(id)
        });

        if (!contact) {
            return res.status(404).json({ error: "Contact not found or invalid ID" });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createContact(req, res) {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        // Validate all required fields
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: "All fields (firstName, lastName, email, favoriteColor, birthday) are required" });
        }

        const newContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const database = await connectDB();
        const result = await database.collection("Contacts").insertOne(newContact);

        res.status(201).json({ id: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateContact(req, res) {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Contact not found or invalid ID" });
        }

        // Validate all required fields
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: "All fields (firstName, lastName, email, favoriteColor, birthday) are required" });
        }

        const updatedContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const database = await connectDB();
        const result = await database.collection("Contacts").updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedContact }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Contact not found or invalid ID" });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteContact(req, res) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Contact not found or invalid ID" });
        }

        const database = await connectDB();
        const result = await database.collection("Contacts").deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Contact not found or invalid ID" });
        }

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };
