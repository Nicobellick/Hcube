const express = require('express')
const app = express()
const port = 4242
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017'
const dbName = 'rdv';

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

// connection.connect(function (err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack)
//       return
//     }
//     console.log('connected as id ' + connection.threadId)
//   })

  app.get('/', (req, res) => {
      res.send('Hi world')
  })

  app.listen(port, () => {
      console.log(`Server is runing on ${port}`)
  })