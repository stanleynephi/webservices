//this is the code for the swagger autogen to provide documentation for the api created
const swagger = require("swagger-autogen")()

const documentation = {
  info: {
    //documents layout for the api
    title: "API Documentation For Webservices With Swagger",
    description:
      "This is the documentation for query database that contains contact information",
  },
  host: "localhost:8080",
}

const outputFile = "./swagger-output.json"
const routes = ["./router/index.js"]

swagger(outputFile, routes, documentation)
