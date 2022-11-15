const express = require('express');
const bodyParser = require('body-parser');
const tour_route = require('./routes/tour.route');
const concert_route = require('./routes/concert.route');
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require('cors');
const path = require("path");
const app = express();
var PORT = process.env.PORT|| 8080;

app.use(cors());
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dynamon Tour - Concert Service",
            version: "1.0.0"
        },
        
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.json({ "Hi": "Hello World" })
})

app.use('/api', tour_route);
app.use('/api', concert_route);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)))


app.listen(PORT, () => {
    console.log(`Port listening on ${PORT}`)
})

module.exports = app;