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
let outStr = ""

let walletInfo
let TOKENID
try {
  walletInfo = require(`../../ipfssailsserverwork/.secret/wallet.live.json`)

} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

const mnemonic = walletInfo.mnemonic


// create 128 bit BIP39 mnemonic
//const mnemonic = SLP.Mnemonic.generate(128, SLP.Mnemonic.wordLists()[lang])
console.log("BIP44 $BCH Wallet")
outStr += "BIP44 $BCH Wallet\n"
console.log(`128 bit ${lang} BIP39 Mnemonic: `, mnemonic)
outStr += `\n128 bit ${lang} BIP32 Mnemonic:\n${mnemonic}\n\n`

// root seed buffer
const rootSeed = SLP.Mnemonic.toSeed(mnemonic)

// master HDNode
let masterHDNode
if (NETWORK === `mainnet`) masterHDNode = SLP.HDNode.fromSeed(rootSeed)
else masterHDNode = SLP.HDNode.fromSeed(rootSeed, "testnet") // Testnet

// HDNode of BIP44 account
const account = SLP.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")
console.log(`BIP44 Account: "m/44'/145'/0'"`)
outStr += `BIP44 Account: "m/44'/145'/0'"\n`

var addrarray = [];

for (let i = 0; i < 10; i++) {
  const childNode = masterHDNode.derivePath(`m/44'/145'/0'/0/${i}`)
  console.log(`m/44'/145'/0'/0/${i}: ${SLP.HDNode.toCashAddress(childNode)}`)
  outStr += `m/44'/145'/0'/0/${i}: ${SLP.HDNode.toCashAddress(childNode)}\n`

var outObj = {}
	   outObj.derivePath = `m/44'/145'/0'/0/${i}`;
    outObj.cashAddress = SLP.HDNode.toCashAddress(childNode)
    outObj.slpAddress = SLP.Address.toSLPAddress(outObj.cashAddress)
    outObj.legacyAddress = SLP.Address.toLegacyAddress(outObj.cashAddress)

    addrarray.push(outObj);
}



// Write out the basic information into a json file for other apps to use.
fs.writeFile("extended.wallet.live.json", JSON.stringify(addrarray, null, 2), function(err) {
  if (err) return console.error(err)
  console.log(`extended.wallet.live.json written successfully.`)
})
