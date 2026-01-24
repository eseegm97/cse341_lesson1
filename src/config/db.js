const { MongoClient } = require("mongodb");
require("dotenv").config();

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined");
}
if (!process.env.DB_NAME) {
    throw new Error("DB_NAME environment variable is not defined");
}

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
    if (db) {
        return db;
    }
    
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log("Connected to MongoDB");
        return db;
    } catch (err) {
         console.error("Failed to connect to MongoDB:", err.message);
        throw err;
    }
}

module.exports = { connectDB };
