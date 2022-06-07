const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

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

// middleware
app.use(helmet());
app.use(morgan('common'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
