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

module.exports = { getAllContacts, getContactById };
