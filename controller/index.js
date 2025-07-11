//get the data that will be used to query the database for the results we seek
//create a controller object to handle the function for the controller.
const database = require("../database");
const { ObjectId } = require("mongodb");
const controller = {};

controller.professional_data = async function (req, res, next) {
  try {
    const db = await database.getdatabase(); // get DB instance
    const collection = db.collection("contacts");
    console.log(collection);
    const count = await collection.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    const data = await collection.find({}).toArray();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log("No Data To Return");
    console.log(error);
    res.status(500).json({ error: "Server error, No Data to Return" });
  }
};

//get the data by the id provided
controller.usersbyID = async function (req, res, next) {
  try {
    //get the id based of the parameter
    const id = req.params.id;
    //check if the id is valid for the object class
    if (!ObjectId.isValid(id)) {
      //return a message saying the user id is not good
      return res.status(404).json({ message: "no user data found" });
    }
    //connect to the database
    const db = await database.getdatabase();
    //get the datbase collection
    const collection = db.collection("contacts");
    //find the data based of the id provided
    const data = await collection.findOne({ _id: new ObjectId(id) });
    console.log("Data found for user", data);
    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error("❌ Error fetching user by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = controller;
