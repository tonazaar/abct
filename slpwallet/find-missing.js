/*
  Create an HDNode wallet using SLP SDK. The mnemonic from this wallet
  will be used in the other examples.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `mainnet`

const SLPSDK = require("slp-sdk")

// Instantiate SLP based on the network.
let SLP
if (NETWORK === `mainnet`)
  SLP = new SLPSDK({ restURL: `https://rest.bitcoin.com/v2/` })
else SLP = new SLPSDK({ restURL: `https://trest.bitcoin.com/v2/` })

const fs = require("fs")

const lang = "english"
var xxx = "removed hhshhsh                                                    l";

let outStr = ""

let walletInfo2
let TOKENID
try {
  walletInfo2 = require(`../../ipfssailsserverwork/.secret/wallet.live.json`)

} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

for (let i = 0; i < 10; i++) {
var mnemonic = "ring"+i+" "+xxx;


// create 128 bit BIP39 mnemonic
//const mnemonic = SLP.Mnemonic.generate(128, SLP.Mnemonic.wordLists()[lang])
console.log("BIP44 $BCH Wallet")
outStr += "BIP44 $BCH Wallet\n"
console.log(`128 bit ${lang} BIP39 Mnemonic: `, mnemonic)
outStr += `\n128 bit ${lang} BIP32 Mnemonic:\n${mnemonic}\n\n`

// root seed buffer
var rootSeed = SLP.Mnemonic.toSeed(mnemonic)

// master HDNode
let masterHDNode
if (NETWORK === `mainnet`) masterHDNode = SLP.HDNode.fromSeed(rootSeed)
else masterHDNode = SLP.HDNode.fromSeed(rootSeed, "testnet") // Testnet

// HDNode of BIP44 account
var account = SLP.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")
console.log(`BIP44 Account: "m/44'/145'/0'"`)
outStr += `BIP44 Account: "m/44'/145'/0'"\n`

var addrarray = [];
var outObj = {}

  var childNode = masterHDNode.derivePath(`m/44'/145'/0'/0/0`)

  console.log("i =" + outObj.cashAddress );
    outObj.cashAddress = SLP.HDNode.toCashAddress(childNode)
    if('bitcoincash:qq38f7w5rpf7ztdvxqkxypu04cp8nr32n5x08ksal3' === outObj.cashAddress) {
	    
  console.log("matched i =" + outObj.cashAddress );
    }

    addrarray.push(outObj);
}



// Write out the basic information into a json file for other apps to use.
fs.writeFile("extended.wallet.live.json", JSON.stringify(addrarray, null, 2), function(err) {
  if (err) return console.error(err)
  console.log(`extended.wallet.live.json written successfully.`)
})
