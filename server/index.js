const express = require('express')
const app = express()
const port = 4242
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017'
const dbName = 'rdv';

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
MongoClient.connect(url, function(err, client) {
  console.log("Connecté à MongoDB");
  const db = client.db(dbName);
  client.close();
});

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecté à Mongoose")
});



  app.get('/', (req, res) => {
      res.send('Hi world')
  })

  app.listen(port, () => {
      console.log(`Server is runing on ${port}`)
  })