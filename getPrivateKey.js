var keythereum = require("keythereum");
var datadir = "C:\\Users\\xfshen\\AppData\\Roaming\\MoacNode\\testnet";  //moacnode目录，根据实际修改
//var datadir = "/Users/gm/Library/MoacNode";                    //苹果mac系统moacnode目录，根据实际修改
var address= "0x968ddf25855f55306f3aa24973d73709d8c743a6";       //本地节点账号，根据实际修改
const password = "password";                                     //账号密码，根据实际修改
 
var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);        //输出私钥
console.log(privateKey.toString('hex'));

