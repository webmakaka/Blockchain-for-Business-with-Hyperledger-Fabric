var query = require('./query.js');
var invoke = require('./invoke');
var changeOwner = require('./changeOwner');
var bodyParser = require('body-parser');

module.exports = function (app) {
  app.get('/property', function (req, res) {
    var startIndex = req.query.startIndex;
    var endIndex = req.query.endIndex;

    var data = query(startIndex, endIndex).then((data) => {
      if (!data) {
        return res.status(400).send({ error: 'not found' });
      }

      var body = JSON.parse(data);
      return res.json(body);
    });
  });

  app.post('/property', function (req, res) {
    console.log('--------', req.body);
    var data = req.body;
    console.log('register Data....', data);

    var data = invoke
      .invokeChaincode(
        data.propertyId,
        data.area,
        data.cost,
        data.type,
        data.location,
        data.ownerName,
        data.value
      )
      .then((data) => {
        if (!data) {
          return res.status(400).send({ error: 'not found' });
        }

        return res.json({ result: 'added new property to ledger!' });
      });
  });

  app.put('/property', function (req, res) {
    var data = req.body;
    console.log(data);

    var data = changeOwner
      .changeOwner(data.newOwner, data.propertyId)
      .then((data) => {
        if (!data) {
          return res.status(400).send({ error: 'not found' });
        }

        return res.json({ result: 'change owner success' });
      });
  });
};
