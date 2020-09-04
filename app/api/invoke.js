'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');

module.exports = (function () {
  return {
    invokeChaincode: async function invoke(p, r, o, m, a, i, n) {
      // A wallet stores a collection of identities for use
      const wallet = await Wallets.newFileSystemWallet('./wallet');

      // A gateway defines the peers used to access Fabric networks
      const gateway = new Gateway();

      console.log('\n\n --- invoke.js - start');
      try {
        const userName = 'appUser';

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

        // Access PaperNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');

        // Get addressability to commercial paper contract
        console.log('Use smart contract.');

        const contract = await network.getContract('basic');

        console.log(p, r, o, m, a, i, n);

        const result = await contract.submitTransaction(
          'createProperty',
          p,
          r,
          o,
          m,
          a,
          i,
          n
        );

        return result;
      } catch (error) {
        console.log('Unable to invoke ::' + error.toString());
      } finally {
        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();
      }
      console.log('\n\n --- invoke.js - end');
    },
  };
})();
