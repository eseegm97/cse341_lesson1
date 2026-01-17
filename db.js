require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.DB_URI;
const client = new MongoClient(uri);

async function connectToCluster() {
    try {
        await client.connect();
        console.log('Successfully connected to MongoDB Atlas!')
    } catch (e) {
        console.error('Connection to MongoDB Atlas failed!', e);
        process.exit();
    }
}

connectToCluster();
