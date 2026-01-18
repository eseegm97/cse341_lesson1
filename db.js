const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
    if (db) {
        try {
            await client.db("admin").command({ ping: 1 });
            return db;
        } catch (err) {
            console.warn("Connection lost, reconnecting...");
            db = null;
        }
    }
    
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

module.exports = { connectDB };
