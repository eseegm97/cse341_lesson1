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
    const database = await connectDB();
    return await database.collection("contacts").find({}).toArray();
}

async function getContactById(id) {
    const database = await connectDB();
    try {
        return await database.collection("contacts").findOne({ _id: new ObjectId(id) });
    } catch {
        return null;
    }
}

module.exports = { getAllContacts, getContactById };
