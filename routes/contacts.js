const { ObjectId } = require("mongodb");
const { connectDB } = require("../db");

async function getAllContacts() {
    const database = await connectDB();
    const contacts = await database.collection("Contacts").find({}).toArray();
    return contacts;
}

async function getContactById(id) {
    const database = await connectDB();

    if (!ObjectId.isValid(id)) {
        return null;
    }

    const contact = await database.collection("Contacts").findOne({
        _id: new ObjectId(id)
    });
    
    return contact;
}

module.exports = { getAllContacts, getContactById };
