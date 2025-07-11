//contains the database connection for our mongodb database
//mongoclient class brought into scope to be used for connection
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

let database;
let client;
//establish a connection check for ssl
client = new MongoClient(uri, {
  //ssl to be true
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//establish the connection
async function connecttoDatabase() {
  try {
    database = await client.connect();
    database = true;
    console.log("connected");
    return database;
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
}

//async getdatabase from the mongodabase
async function getdatabase() {
  //try catch to get errors and return them
  try {
    //establish a connection if one is not available
    if (database) {
      console.log("database connection is still open");
      const db = client.db("Project01");

      if (db) {
        return db;
      } else {
        console.log("database not found");
      }
    } else {
      console.log("no database connection found");
    }
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = { connecttoDatabase, getdatabase };
