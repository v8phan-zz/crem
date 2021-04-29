const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient

MongoClient.connect("mongodb://localhost:3000/db", (err, client) => {
  if(err) {
    throw err
  }
  console.log(client)
  console.log(error)
});

app.use(express.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })
  
app.post('/quotes', (req, res) => {
  console.log(req.body)
})

//test commit

//npm run dev to trigger nodemon server.js