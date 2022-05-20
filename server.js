const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbname: 'ProjectTwo-fullstackApp'
  })
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.json());

// initialize routes
app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
