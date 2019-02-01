const mysql = require('mysql');
const express = require("express");

const configServer = require("./config/config");
const configDb = require("./config/db");


const app = express();
const client = mysql.createClient();


app.get('/login',(req, res) => {
	client.connect(err => {
		if (err) throw err;

		const login = req.;
		const password = ;
		client.query('select * from users')

	});

	client.end(err => {

	});
	res.send('asdsdas');
}).listen(config.port);

