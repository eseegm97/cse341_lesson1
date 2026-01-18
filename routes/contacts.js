const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function getAllContacts() {
    try {
        await client.connect();
        const collection = client.db("cse341").collection("Contacts");
        const contacts = await collection.find({}).toArray();
        return contacts;
    } finally {
        await client.close();
    }
}

async function getContactById(id) {
    try {
        await client.connect();
        const collection = client.db("cse341").collection("Contacts");
        const contact = await collection.findOne({ _id: new ObjectId(id) });
        return contact;
    } finally {
        await client.close();
    }
}

module.exports = { getAllContacts, getContactById };
