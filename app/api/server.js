// nodejs server setup

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var Fabric_Client = require('fabric-client');
var path = require('path');
var util = require('util');
var os = require('os');

// instantiate the app
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// this line requires and runs the code from our routes.js file and passes it app
require('./routes.js')(app);

app.get('/healthcheck', async (req, res) => res.sendStatus(200));

// Save our port
var port = process.env.PORT || 8000;

// Start the server and listen on port
app.listen(port, function () {
  console.log('Live on port: ' + port);
});
