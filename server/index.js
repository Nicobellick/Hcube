const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv/config')

// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017'
// const dbName = 'rdv';
const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute);


mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('connected to database')
});
// MongoClient.connect(url, function(err, client) {
//   console.log("Connecté à MongoDB");
//   const db = client.db(dbName);
//   client.close();
// });

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

// db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("connecté à Mongoose")
// });



  app.get('/', (req, res) => {
      res.send('Hi world')
      
  })
  app.get('/test', (req, res) => {
    res.send('Hi quentin')
    res.status(200).json()
})

  app.listen(4242, () => {
      console.log(`Server is runing on 4242`)
  })