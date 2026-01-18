const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db("yourDBName");
        console.log("MongoDB connected!");
    }
    return db;
}

async function getAllContacts() {
    const database = await connectDB();
    const collection = database.collection("contacts");
    return await collection.find({}).toArray();
}

async function getContactById(id) {
    const database = await connectDB();
    const collection = database.collection("contacts");

    try {
        return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
        return null;
    }
}

module.exports = { getAllContacts, getContactById };
