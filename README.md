# [Book, Nakul Shah] Blockchain for Business with Hyperledger Fabric: A complete guide to enterprise Blockchain implementation using Hyperledger Fabric [ENG, 2019]

<br/>

## 2 brahcnes:

Here is 2 branches.

- master with updated comes by me and works with hyperledger v2.2
- orig - with original codes for v.1.4. I had some issue with starting hypeledger network.

<br/>

### Final App:

![Application](/img/pic1.png?raw=true)

<br/>

## How to run:

<br/>

### nvm installation

    -- installation

    $ LATEST_VERSION=$(curl --silent "https://api.github.com/repos/nvm-sh/nvm/releases/latest" | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/')

    $ curl -o- https://raw.githubusercontent.com/creationix/nvm/${LATEST_VERSION}/install.sh | bash

<br/>

    $ export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

<br/>

    $ nvm --version
    0.35.3

<br/>

### Select appropriate node version

    $ {
      nvm install v12.18.3
      nvm use v12.18.3
      nvm alias default v12.18.3
    }

<br/>

### I remove everything

    $ mkdir -p ~/projects/dev/hyperledger/
    $ cd ~/projects/dev/hyperledger/
    $ sudo rm -rf *

<br/>

### Attention! All containers, images and volumes will be deleted

    $ {
        docker stop $(docker ps -aq)
        docker rm $(docker ps -aq)
        docker system prune -a
    }

<br/>

### Let start

    $ curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s 2.2.0

<br/>

    $ cd ~/projects/dev/hyperledger/fabric-samples/test-network/
    $ ./network.sh down && ./network.sh up createChannel -c mychannel -ca

<br/>

    $ docker ps
    CONTAINER ID        IMAGE                               COMMAND                  CREATED             STATUS              PORTS                              NAMES
    b68320e99da8        hyperledger/fabric-peer:latest      "peer node start"        33 seconds ago      Up 30 seconds       7051/tcp, 0.0.0.0:9051->9051/tcp   peer0.org2.example.com
    d856a59deaaa        hyperledger/fabric-orderer:latest   "orderer"                33 seconds ago      Up 31 seconds       0.0.0.0:7050->7050/tcp             orderer.example.com
    c7228c77e6c0        hyperledger/fabric-peer:latest      "peer node start"        33 seconds ago      Up 31 seconds       0.0.0.0:7051->7051/tcp             peer0.org1.example.com
    1c9f53523d6d        hyperledger/fabric-ca:latest        "sh -c 'fabric-ca-se…"   52 seconds ago      Up 50 seconds       0.0.0.0:7054->7054/tcp             ca_org1
    938938a0088d        hyperledger/fabric-ca:latest        "sh -c 'fabric-ca-se…"   52 seconds ago      Up 50 seconds       7054/tcp, 0.0.0.0:9054->9054/tcp   ca_orderer
    473359ec9851        hyperledger/fabric-ca:latest        "sh -c 'fabric-ca-se…"   52 seconds ago      Up 49 seconds       7054/tcp, 0.0.0.0:8054->8054/tcp   ca_org2

<br/>

### Download project

    $ cd ~/projects/dev/hyperledger

    $ git clone https://github.com/webmakaka/Blockchain-for-Business-with-Hyperledger-Fabric

<br/>

### Chaincode

    $ cd ~/projects/dev/hyperledger/Blockchain-for-Business-with-Hyperledger-Fabric/app/chaincode

    $ npm install
    $ npm run build

<br/>

    $ cd ~/projects/dev/hyperledger/fabric-samples/test-network/

<br/>

    $ {
        export PATH=${PWD}/../bin:$PATH
        export FABRIC_CFG_PATH=$PWD/../config/
    }

<br/>

    $ peer lifecycle chaincode \
        package basic.tar.gz \
        --path ~/projects/dev/hyperledger/Blockchain-for-Business-with-Hyperledger-Fabric/app/chaincode/ \
        --lang node \
        --label basic_1.0

basic.tar.gz should be created in the current folder

<br/>

### Install the chaincode package

**Org1**

    $ {
        export CORE_PEER_TLS_ENABLED=true
        export CORE_PEER_LOCALMSPID="Org1MSP"
        export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
        export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
        export CORE_PEER_ADDRESS=localhost:7051
    }

<br/>

    $ peer lifecycle chaincode install basic.tar.gz

<br/>

**Org2**

    $ {
        export CORE_PEER_LOCALMSPID="Org2MSP"
        export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
        export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
        export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
        export CORE_PEER_ADDRESS=localhost:9051
    }

<br/>

    $ peer lifecycle chaincode install basic.tar.gz

<br/>

### Approve a chaincode definition

    $ peer lifecycle chaincode queryinstalled

    // Будет отличаться от того, что у меня
    $ export CC_PACKAGE_ID=basic_1.0:4ec191e793b27e953ff2ede5a8bcc63152cecb1e4c3f301a26e22692c61967ad

    $ echo $CC_PACKAGE_ID

    $ peer lifecycle chaincode approveformyorg \
        -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --channelID mychannel \
        --name basic \
        --version 1.0 \
        --package-id $CC_PACKAGE_ID \
        --sequence 1 \
        --tls \
        --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

<br/>

You need to approve a chaincode definition with an identity that has an admin role.

    $ {
        export CORE_PEER_LOCALMSPID="Org1MSP"
        export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
        export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
        export CORE_PEER_ADDRESS=localhost:7051
    }

<br/>

    $ peer lifecycle chaincode approveformyorg \
        -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --channelID mychannel \
        --name basic \
        --version 1.0 \
        --package-id $CC_PACKAGE_ID \
        --sequence 1 \
        --tls \
        --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

<br/>

### Committing the chaincode definition to the channel

    $ peer lifecycle chaincode checkcommitreadiness \
        --channelID mychannel \
        --name basic \
        --version 1.0 \
        --sequence 1 \
        --tls \
        --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
        --output json

<br/>

```
{
	"approvals": {
		"Org1MSP": true,
		"Org2MSP": true
	}
}

```

<br/>

    $ peer lifecycle chaincode commit \
        -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --channelID mychannel \
        --name basic \
        --version 1.0 \
        --sequence 1 \
        --tls \
        --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
        --peerAddresses localhost:7051 \
        --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
        --peerAddresses localhost:9051 \
        --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt

You can use the peer lifecycle chaincode querycommitted command to confirm that the chaincode definition has been
committed to the channel.

    $ peer lifecycle chaincode querycommitted \
        --channelID mychannel \
        --name basic \
        --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

```
Committed chaincode definition for chaincode 'basic' on channel 'mychannel':
Version: 1.0, Sequence: 1, Endorsement Plugin: escc, Validation Plugin: vscc, Approvals: [Org1MSP: true, Org2MSP: true]

```

<br/>

### Invoking the chaincode

    $ peer chaincode invoke \
        -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls \
        --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
        -C mychannel \
        -n basic \
        --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
        --peerAddresses localhost:9051 \
        --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
        -c '{"function":"initLedger","Args":[]}'

<br/>

    $ peer chaincode query -C mychannel -n basic -c '{"Args":["queryAllAssets", "P100001", "P100005"]}' | python -m json.tool

```
[
    {
        "Key": "P100001",
        "Record": {
            "propertyArea": "1400 sqft.",
            "ownerName": "sam dave",
            "value": 12332,
            "location": "12 avenue,richar street , california",
            "type": "single",
            "propertyNumber": "P100001"
        }
    },
    {
        "Key": "P100002",
        "Record": {
            "propertyArea": "12400 sqft.",
            "ownerName": "john dave",
            "value": 22330,
            "location": "13 avenue,richar street , california",
            "type": "multiplex",
            "propertyNumber": "P100002"
        }
    }
]
```

<br/>

### API

    $ npm install -g nodemon

    $ cd ~/projects/dev/hyperledger/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/

    $ cp connection-org1.yaml ~/projects/dev/hyperledger/Blockchain-for-Business-with-Hyperledger-Fabric/app/api/

    $ cp connection-org1.json ~/projects/dev/hyperledger/Blockchain-for-Business-with-Hyperledger-Fabric/app/api/

    $ cd ~/projects/dev/hyperledger/Blockchain-for-Business-with-Hyperledger-Fabric/app/api

    $ npm install
    $ node enrollAdmin.js
    $ node registerUser.js

    $ npm start

<br/>

### Checks

    $ curl \
        --request GET http://localhost:8000/healthcheck

<br/>

**Returnting from the ledger check:**

    $ curl \
        --request GET 'http://localhost:8000/property?startIndex=P100001&endIndex=P100005' \
         --header "Content-Type: application/json" \
        | python -m json.tool

```
[
    {
        "Key": "P100001",
        "Record": {
            "propertyArea": "1400 sqft.",
            "ownerName": "sam dave",
            "value": 12332,
            "location": "12 avenue,richar street , california",
            "type": "single",
            "propertyNumber": "P100001"
        }
    },
    {
        "Key": "P100002",
        "Record": {
            "propertyArea": "12400 sqft.",
            "ownerName": "john dave",
            "value": 22330,
            "location": "13 avenue,richar street , california",
            "type": "multiplex",
            "propertyNumber": "P100002"
        }
    }
]
```

<br/>

### Client (angular)

    $ cd ~/projects/dev/hyperledger/Blockchain-for-Business-with-Hyperledger-Fabric/app/client

    $ npm install
    $ npm start

http://localhost:4200/

<br/>

You can add next data from emample:

```
'P100003',
'marley',
'2838',
'marley2',
'marley3',
'2323',
'marley4'
```

<br/>

```
'P100004',
'nosorog',
'2838',
'nosorog',
'nosorog',
'2323',
'nosorog'
```

<br/>

And then update it:

```
'P100003'
'nosorog'
```

Some not so interesting samples from the book, you can find <a href="//matematika.org/books/blockchain/hyperledger/en/fabric/blockchain-for-business-with-hyperledger-fabric/">here</a>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
