/*
  Check the SLP token balance by tokenId for the wallet created with the
  create-wallet example app.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `mainnet`

// Set the TOKEN ID you are interested in

const SLPSDK = require("slp-sdk")

// Instantiate SLP based on the network.
let SLP
if (NETWORK === `mainnet`)
  SLP = new SLPSDK({ restURL: `https://rest.bitcoin.com/v2/` })
else SLP = new SLPSDK({ restURL: `https://trest.bitcoin.com/v2/` })

// Open the wallet generated with create-wallet.
let TOKENID;
let walletInfo
let slpAddress;
try {
//  walletInfo = require(`../create-wallet/wallet.json`)
  TOKENID = require(`./token-live.json`).TOKENID;
  slpAddress = require(`./token-live.json`).slpAddress;

} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

async function getBalance() {
  try {
	  /*
    const mnemonic = walletInfo.mnemonic

    // root seed buffer
    const rootSeed = SLP.Mnemonic.toSeed(mnemonic)

    // master HDNode
    let masterHDNode
    if (NETWORK === `mainnet`) masterHDNode = SLP.HDNode.fromSeed(rootSeed)
    else masterHDNode = SLP.HDNode.fromSeed(rootSeed, "testnet") // Testnet

    // HDNode of BIP44 account
    const account = SLP.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

    const change = SLP.HDNode.derivePath(account, "0/0")

    // get the cash address
    const cashAddress = SLP.HDNode.toCashAddress(change)

    // convert to slp address
    const slpAddress = SLP.Address.toSLPAddress(cashAddress)

    console.log(`SLP Token information:`)
  */
    // get token balances
    try {
      const tokens = await SLP.Utils.balance(slpAddress, TOKENID)

      console.log(JSON.stringify(tokens, null, 2))
    } catch (error) {
      if (error.message === "Address not found") console.log(`No tokens found.`)
    }
  } catch (err) {
    console.error(`Error in getBalance: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
getBalance()
