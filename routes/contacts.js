const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db("cse341");
        console.log("MongoDB connected!");
    }
    return db;
}

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
