const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
//app.use(bodyParser.json())
//https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/crem", {
  useUnifiedTopology: true,
})
  .then((client) => {
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");

    app.listen(3000, function () {
      console.log("listening on 3000");
    });

    app.get("/", (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
        })
        .catch((error) => console.log(error));
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then(() => {
          res.redirect("/");
        })
        .catch((e) => console.log(e));
    });
    app.put("/quotes", (req, res) => {
      console.log(req.body);
      quotesCollection
        .findOneAndUpdate(
          { name: "Yoda" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          res.json("Success");
        })
        .catch((error) => console.error(error));
    });
    app.delete("/quotes", (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name }
      )
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json("No quote to delete");
            }
            res.json("Deleted Vader quote");
          })
          .catch((error) => console.error(error))
    });
  })
  .catch(console.error);

//test commit

//npm run dev to trigger nodemon server.js

//CRUD - DELETE
