const { MongoClient } = require("mongodb");
require("dotenv").config();

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
