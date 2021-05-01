const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config')


// Routes
const postsRoute = require('./routes/posts')


app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use('/posts', postsRoute);



mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('connected to database')
});



  app.get('/', (req, res) => {
      res.status(200).send('Hi world')
      
  })

  app.listen(4242, () => {
      console.log(`Server is runing on 4242`)
  })