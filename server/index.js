const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');
require('dotenv/config')


app.use(cors('*'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
// Routes
const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute);
const rdvsRoute = require('./routes/rdvs')
app.use('/rdvs', rdvsRoute)




mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('connected to database')
});



  app.get('/', (req, res) => {
      res.status(200).send('Hi world')
      
  })

  app.listen(4242, () => {
      console.log(`Server is runing on 4242`)
  })