//get the data that will be used to query the database for the results we seek
//create a controller object to handle the function for the controller.
const database = require("../database")
const { ObjectId } = require("mongodb")
const controller = {}

controller.professional_data = async function (req, res) {
  try {
    const db = await database.getdatabase() // get DB instance
    const collection = db.collection("contacts")
    console.log(collection)
    const count = await collection.countDocuments()
    if (count === 0) {
      return res.status(404).json({ message: "No data found" })
    }
    const data = await collection.find({}).toArray()
    console.log(data)
    res.status(200).json(data)
  } catch (error) {
    console.log("No Data To Return")
    console.log(error)
    res.status(500).json({ error: "Server error, No Data to Return" })
  }
}

//get the data by the id provided
controller.usersbyID = async function (req, res) {
  try {
    //get the id based of the parameter
    const id = req.params.id
    //check if the id is valid for the object class
    if (!ObjectId.isValid(id)) {
      //return a message saying the user id is not good
      return res.status(404).json({ message: "no user data found" })
    }
    //connect to the database
    const db = await database.getdatabase()
    //get the datbase collection
    const collection = db.collection("contacts")
    //find the data based of the id provided
    const data = await collection.findOne({ _id: new ObjectId(id) })
    console.log("Data found for user", data)
    if (data) {
      return res.status(200).json(data)
    }
  } catch (error) {
    console.error("❌ Error fetching user by ID:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

//create a new contact based on the information the user provided
controller.createContact = async function (req, res) {
  try {
    //get the information from the form and then pass it to the database
    const contact = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      favouriteColor: req.body.favouriteColor,
      birthday: req.body.birthday,
    }

    //add the information acquire to the database
    if (contact) {
      console.log("Here is the provided user data", contact)
      //connect to the database
      const db = await database.getdatabase()
      //get the collection
      const collection = db.collection("contacts")
      //insert the information into the database
      const data = await collection.insertOne(contact)
      //console.log the data
      console.log(data)
      if (data) {
        return res.status(200).json(data)
      }
    }
  } catch (error) {
    console.log("❌ Error", error)
    return res.send("there was an error in your code", error)
  }
}

//delete information based of the id provided
controller.deleteInformation = async function (req, res) {
  //get the account id
  try {
    //get the id from the param
    const id = req.params.id

    //check if id is valid
    if (!ObjectId.isValid(id)) {
      //return a message showing the id is not valid
      return res.status(404).json({
        message: "there is no account with this kind of id",
      })
    }

    //connect to the database and find that id
    const db = await database.getdatabase()
    const collection = await db.collection("contacts")

    //find the data based of the id and delete
    const data = await collection.deleteOne({
      _id: new ObjectId(id),
    })

    console.log("data delete successfully", data)

    if (data) {
      return res.status(200).json(data)
    }
  } catch (error) {
    console.log("❌`Error deleting data with user id", error)
    return res.status(500).json({
      message: "Internal error found",
    })
  }
}
// Update the data in the database
controller.updateContact = async function (req, res) {
  const contactId = req.params.id
  const newData = req.body

  try {
    const db = await database.getdatabase()
    const collection = db.collection("contacts")

    // Step 1: Get the existing data
    const existing = await collection.findOne({ _id: new ObjectId(contactId) })

    if (!existing) {
      return res.status(404).json({ message: "No existing contact" })
    }

    // Step 2: Prepare updated data (skip fields with value "any")
    const updateData = {
      firstname:
        newData.firstname && newData.firstname.trim() !== "any"
          ? newData.firstname
          : existing.firstname,
      lastname:
        newData.lastname && newData.lastname.trim() !== "any"
          ? newData.lastname
          : existing.lastname,
      email:
        newData.email && newData.email.trim() !== "any"
          ? newData.email
          : existing.email,
      favouriteColor:
        newData.favouriteColor && newData.favouriteColor.trim() !== "any"
          ? newData.favouriteColor
          : existing.favouriteColor,
      birthday:
        newData.birthday && newData.birthday.trim() !== "any"
          ? newData.birthday
          : existing.birthday,
    }

    // Step 3: Perform the update
    const result = await collection.updateOne(
      { _id: new ObjectId(contactId) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Contact not found during update." })
    }

    // Step 4: Send one response with before and after
    res.status(200).json({
      message: "Contact updated successfully",
      beforeUpdate: existing,
      afterUpdate: updateData,
    })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

module.exports = controller
