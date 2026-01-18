require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        const databasesList = await client.db().admin().listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } catch (error) {
        console.error("MongoDB connection error:", error);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

main().catch(console.error);
