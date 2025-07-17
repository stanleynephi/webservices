//create the node application
const express = require("express")
const bodyParser = require("body-parser")
const mongodb = require("./database/index")
const professionalRoute = require("./router/")
const cors = require("cors")

//port to start app
const port = process.env.PORT || 8080
const app = express()

//add cors to communicate with the frontend
app.use(cors())

app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  next()
})

//handles the routing of requests made to the webserver and the api
app.use("/", professionalRoute)

app.listen(port, async () => {
  console.log("app is listening on port", port)
  const connect = await mongodb.connecttoDatabase()
  return connect
})
