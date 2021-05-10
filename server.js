const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/crem", {
  useUnifiedTopology: true,
}).then((client) => {
  console.log("Connected to Database");
  const db = client.db("star-wars-quotes");
  const quotesCollection = db.collection('quotes')

  app.set('view engine', 'ejs')

  app.use(express.urlencoded({ extended: true }));

  app.listen(3000, function () {
    console.log("listening on 3000");
  })

  app.get("/", (req, res) => {
    const cursor = db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
      })
      .catch(/*...*/)
    console.log(cursor)
    res.sendFile(__dirname + "/index.html");
  })

  app.post("/quotes", (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        console.log(result)
        res.render(view, locals)
        res.redirect('/')
      })
    .catch(error => console.error(error))
    console.log(req.body);
  })
})
.catch(console.error)

//test commit

//npm run dev to trigger nodemon server.js

//Next, we’ll use res.render to render this index.ejs file.


