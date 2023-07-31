const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const apiRoutes = require('./routes/apiroutes');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());

app.use(cors());

app.use('/api', apiRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect(MONGO_URI)
  .then(result => {
    console.log('Connected!');
    app.listen(PORT || 3000)
  })
  .catch(err => {
    console.log(err);
  })