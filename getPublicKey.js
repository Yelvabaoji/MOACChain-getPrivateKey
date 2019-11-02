var Wallet = require('ethereumjs-wallet');
var privateKey = 'a0e77757d2d494739ebb293209ddeccfcb21483e9177475411fb884dd987c7e4';
var key = Buffer.from(privateKey, 'hex');
var wallet = Wallet.fromPrivateKey(key);
    
wallet.toV3String('pass');
console.log("Get keystore", wallet.toV3String('pass'));
