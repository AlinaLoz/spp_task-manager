require('dotenv').config();
const express = require("express");
const cors = require('express-cors');
const bodyParser = require("body-parser");
const app = express();
const bearerToken = require('express-bearer-token');

app.use(cors({allowedOrigins: ['localhost:3000']}));
app.use(bearerToken());
app.use(bodyParser.json());

require('./routes')(app);

app.listen(process.env.SERVER_PORT);
