var Wallet = require('ethereumjs-wallet');
var privateKey = 'a1ea49f571a5635a80d915d6174864dea72ee5e858af0fa99a2fdc00837ed935';
var key = Buffer.from(privateKey, 'hex');
var wallet = Wallet.fromPrivateKey(key);
    
wallet.toV3String('pass');
console.log("Get keystore", wallet.toV3String('pass'));
