require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        await listDatabases(client);

    } catch (error) {
        console.error("MongoDB connection error:", error);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
