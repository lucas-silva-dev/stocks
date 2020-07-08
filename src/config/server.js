const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/src/views');
app.use(express.json());

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

consign()
	.include('./app/src/routes.js')
	.into(app);

module.exports = app;