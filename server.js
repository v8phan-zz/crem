const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/crem", {
  useUnifiedTopology: true,
}).then((client) => {
  console.log("Connected to Database");
  const db = client.db("quotes");
  app.use(express.urlencoded({ extended: true }));

  app.listen(3000, function () {
    console.log("listening on 3000");
  })

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  })

  app.post("/quotes", (req, res) => {
    console.log(req.body);
  })
})
.catch(console.error)

//test commit

//npm run dev to trigger nodemon server.js
