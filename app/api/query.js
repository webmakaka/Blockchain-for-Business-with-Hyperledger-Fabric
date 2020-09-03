'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');

module.exports = async function (start, end) {
  const wallet = await Wallets.newFileSystemWallet('./wallet');

  const gateway = new Gateway();

  const userName = 'appUser';

  // Load connection profile; will be used to locate a gateway
  let connectionProfile = yaml.safeLoad(
    fs.readFileSync('./connection-org1.yaml', 'utf8')
  );

  // Set connection options; identity and wallet
  let connectionOptions = {
    identity: userName,
    wallet: wallet,
    discovery: { enabled: true, asLocalhost: true },
  };

  // Connect to gateway using application specified parameters
  console.log('Connect to Fabric gateway.');
  await gateway.connect(connectionProfile, connectionOptions);

  const network = await gateway.getNetwork('mychannel');

  const contract = await network.getContract('basic');

  let result = await contract.evaluateTransaction('queryAllAssets', start, end);

  return result;
};
