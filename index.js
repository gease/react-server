const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const router = require('./router')

//mongoose.connect('mongodb://localhost:auth/auth');
mongoose.connect('mongodb://localhost:27017/local');


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

router(app);

const port = process.env.pott || 3090;

const server = http.createServer(app);
server.listen(port);
console.log("Server is listening");