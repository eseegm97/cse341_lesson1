const { ObjectId } = require("mongodb");
const { connectDB } = require("../db");

async function getAllContacts() {
    const database = await connectDB();
    const contacts = await database.collection("Contacts").find({}).toArray();
    console.log("getAllContacts - Database:", database.name, "Collection count:", contacts.length);
    return contacts;
}

async function getContactById(id) {
    const database = await connectDB();

    if (!ObjectId.isValid(id)) {
        console.log("getContactById - Invalid ObjectId:", id);
        return null;
    }

    const contact = await database.collection("Contacts").findOne({
        _id: new ObjectId(id)
    });
    console.log("getContactById - Searching for ID:", id, "Found:", contact ? "YES" : "NO");
    return contact;
}

module.exports = { getAllContacts, getContactById };
