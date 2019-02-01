const mysql = require('mysql');
const express = require("express");

const configServer = require("./config/config");
const configDb = require("./config/db");


const app = express();
const client = mysql.createClient();


app.get('/',(req, res) => {
	res.send('asdsdas');
}).listen(config.port);

