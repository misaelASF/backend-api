const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./Config/config.json');

const app = express();

mongoose.connect(`mongodb://${config.user_bd}:${config.password_bd}@ds147446.mlab.com:47446/revenue-api`, 
{ useNewUrlParser: true }, console.log('Mongodb OK'));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(require('./routes'));

const port = process.env.PORT || 3000;

app.listen(port);
