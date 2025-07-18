//this file handles the routing of the pages
const express = require("express")
const swaggerui = require("swagger-ui-express")
const swaggerdocument = require("../swagger-output.json")
const router = express.Router()
const controller = require("../controller/")

//route to the swagger ui page for the api documentation
router.use("/api-docs", swaggerui.serve)
router.get("/api-docs", swaggerui.setup(swaggerdocument))

router.get("/", controller.professional_data)
router.get("/:id", controller.usersbyID)

//other routing funtions like post, put and delete to create, update and delete data from the database
router.post("/createContact", controller.createContact) //handles post requests and creation of new data in the database
router.put("/updateContact/:id", controller.updateContact) //handles put requests and update of data in the database
router.delete("/deleteContact/:id", controller.deleteInformation) //handles delete requests and deletion of data in the database
//export router
module.exports = router
