const BATCH_TRANSFER_SERVER_PORT = 3031
const CHAIN3_URL = "http://localhost:8545"


// basic crypto modules
var secp256k1 = require('secp256k1');   //npm install  -g secp256k1
var keccak = require('keccak');         //npm install  -g keccak

// here we need moac chain3 modules
const Chain3 = require('chain3');           //npm i -S chain3
const MoacERC20ABI = require("./moacERC20ABI"); // for interprate ERC 20 bytecode

var chain3 = new Chain3();
chain3.setProvider(new Chain3.providers.HttpProvider(CHAIN3_URL));
if (!chain3.isConnected()){
  console.log("Chain3 RPC is not connected!");
  return;
} else {
  console.log("Chain3 connected")
}
var mc = chain3.mc;
var BigNumber = chain3.BigNumber;


getWalletInfo(
  'dd309044603a35d52468a481b922cfca85b1caed27e97531255ca34bf884b66e',
  true,
  '0x03afc7ca5b56434ebcf8f03eb80f9c52d6b36fed'
)
//**************************************************************
// API to get the balance of moac in the wallet
// and to return ERC20 toekn SYMB and balance if required.
//**************************************************************
function getWalletInfo (privateKey, isERC20, erc20Address) {

  // from private key to generate public key and wallet address
  var publicKey = secp256k1.publicKeyCreate(Buffer.from(privateKey, 'hex'), false).slice(1);
  var addrBuffer = keccak('keccak256').update(publicKey).digest().slice(-20);
  var address = '0x'+addrBuffer.toString('hex')

  // get moac balance in the wallet, convert to moac.
  var balBig = new BigNumber(mc.getBalance(address).toString(10));
  var balance = balBig.dividedBy(10**18);

  console.log('address', address)
  console.log('balance', balance)
  // get ERC20 token if it required
  if (isERC20) {
    var contract = mc.contract(MoacERC20ABI).at(erc20Address)
    if (contract) {
      console.log(JSON.stringify(contract.totalSupply()))
      console.log(JSON.stringify(contract.name()))
      console.log(JSON.stringify(contract.decimals()))
      console.log(JSON.stringify(contract.symbol()))

      var ee = parseInt(JSON.stringify(contract.decimals()).replace(/"/g, ""))

      contract.balanceOf.call( address, function(err, result){
        erc20Balance = ee == 0 ? result : result.dividedBy(10**ee)
        console.log('erc20balance', erc20Balance)
      });
    }
  }
}

