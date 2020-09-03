const query = require('./query.js');
const invoke = require('./invoke');
const changeOwner = require('./changeOwner');
const bodyParser = require('body-parser');

module.exports = function (app) {
  app.get('/property', function (req, res) {
    const startIndex = req.query.startIndex;
    const endIndex = req.query.endIndex;

    // const startIndex = 'P100001';
    // const endIndex = 'P100005';

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
