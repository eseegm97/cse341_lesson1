const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
    if (db) return db;
    
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log("MongoDB connected!");
        return db;
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        throw err;
    }
}

async function getAllContacts() {
    const database = await connectDB();
    return database.collection("contacts").find({}).toArray();
}

async function getContactById(id) {
    const database = await connectDB();

    if (!ObjectId.isValid(id)) {
        return null;
    }

    return database.collection("contacts").findOne({
        _id: new ObjectId(id)
    });
}

module.exports = { getAllContacts, getContactById };
