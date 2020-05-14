/*
  Check the BCH and SLP token balances for the wallet created with the
  create-wallet example app.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `mainnet`

//const SLPSDK = require("../../lib/SLP").default
const SLPSDK = require("slp-sdk")

// Instantiate SLP based on the network.
let SLP
if (NETWORK === `mainnet`)
  SLP = new SLPSDK({ restURL: `https://rest.bitcoin.com/v2/` })
else SLP = new SLPSDK({ restURL: `https://trest.bitcoin.com/v2/` })

// Open the wallet generated with create-wallet.
let walletInfo
let TOKENID
try {
  walletInfo = require(`../../ipfssailsserverwork/.secret/wallet.live.json`)
 extendedaddresslist = require(`../../ipfssailsserverwork/.secret/extended.wallet.live.json`)


} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

async function getBalance() {
  try {
	  


    // get token balances
    try {
    //  const tokens = await SLP.Utils.balancesForAddress(slpAddress)
   for(var i =0; i< extendedaddresslist.length; i++ ) {
      var tokens = await SLP.Utils.balancesForAddress( extendedaddresslist[i].slpAddress, TOKENID)
      console.log(JSON.stringify(tokens, null, 2))
   }



    } catch (error) {
      if (error.message === "Address not found") console.log(`No tokens found.`)
      else console.log(`Error: `, error)
    }
  } catch (err) {
    console.error(`Error in getBalance: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
getBalance()
