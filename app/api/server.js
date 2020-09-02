var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');

// instantiate the app
var app = express();

app.use(cors());

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
