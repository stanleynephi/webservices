//this file handles the routing of the pages
const express = require("express");
const router = express.Router();
const controller = require("../controller/");

router.get("/", controller.professional_data);
router.get("/:id", controller.usersbyID);

//export router
module.exports = router;
