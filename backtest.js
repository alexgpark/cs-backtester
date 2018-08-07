const axios = require('axios');
const log = require('ololog').configure({ locate: false })

const symbol = 'ETH';
const tradingPair = 'BTC';
const startTime = 1531180800;
const endTime = 1531785600;

// const count = 1008;
// const interval = '10m';

// const stopLoss = 0.90;
// const profitTake = 1.10;

const stopLoss = 0.80;
const profitTake = 1.20;

var SLHit = 0;
var PTHit = 0;
var ASHit = 0;
var ASArray = [];

// let baseUrl;
// if (process.env.NODE_ENV === 'production') {
//     baseUrl = 'https://cs-alerts.herokuapp.com'
// } else {
//     baseUrl = 'http://localhost:3000'
// }

// axios.get(`${baseUrl}/alerts`).then(res => {
axios.get(`https://cs-alerts.herokuapp.com/alerts`).then(res => {

    // for (var i = 0; i < 311; i++) { 
    for (var i = 0; i < 311; i++) { 
      // log(res.data[i]);
      log(i);
      const startPrice = res.data[i].history[0].open;
      const stopLossPrice = startPrice * stopLoss;
      const profitPrice = startPrice * profitTake;
      const startTime = res.data[i]._id.startTime;
      

      for (x = 0; x < res.data[i].history.length; x++) {
        // log("*********************************************");
        // log(x);
        const rowData =  res.data[i].history[x]
        // log(rowData);
        // log("-----------------------------------");
        // log("Start Price:", startPrice);
        // log("Stop Loss Price:", stopLossPrice);
        // log("Profit Price:", profitPrice);
        // log("*********************************************");
        const openPrice =  res.data[i].history[x].open;
        const closePrice = res.data[i].history[x].close;
        const highPrice = res.data[i].history[x].high;
        const lowPrice = res.data[i].history[x].low;
        const timestamp = res.data[i].history[x].timestamp;

        if (lowPrice <= stopLossPrice) {
          SLHit = SLHit + 1;
          // log("Stop Loss on Hour:", x)
          // log("Stop Loss Price:", stopLossPrice);
          // log("Low Price:", lowPrice);
          // log("Time Hit:", timestamp)
          break;

        } else if (highPrice >= profitPrice) {
          PTHit = PTHit + 1;
          // log("Profit Take on Hour #:", x)
          // log("High Price:", highPrice);
          // log("Profit Price:", profitPrice);
          break;

        } else if (x>167) {
          // log("AutoSell");
          // log(rowData);
          // log("Start Price:", startPrice);
          // log("Low Price:", lowPrice);
          // log("Stop Loss Price:", stopLossPrice);
          // log("High Price:", highPrice);
          // log("Profit Price:", profitPrice);
          // log("closePrice:", closePrice);
          var autoSellResult = ((((closePrice-startPrice)/startPrice))*100);
          // log("autoSellResult:", autoSellResult);
          // log("Start Price:", startPrice);
          // log("Stop Loss Price:", stopLossPrice);
          // log("Profit Price:", profitPrice);
          ASArray.push(autoSellResult);
          ASHit = ASHit + 1;

        } else {
          // log(rowData);
          // log("-----------------------------------");
          // log("Start Price:", startPrice);
          // log("Stop Loss Price:", stopLossPrice);
          // log("Profit Price:", profitPrice);
          // log("*********************************************");
        }

      }

      log("PTHIT:", PTHit);
      log("SLHIT:", SLHit);
      log("ASHit:", ASHit);
      // log("ASArray:", ASArray.length);
      // // log(ASArray);
      log(ASArray.toString());
      
      log("*********************************************");
    }


    // for (var z = 0; z < ASArray.length; x++) {
    //   log(ASArray[z]);
    
    // }
}).catch(err => console.log('error', error))




  
// axios.get(`https://api.coinmarketcap.com/v1/ticker/bitcoin/`).then(res => {

//     console.log(res.data);
    
//   }).catch(err => console.log('error fetching info from coinmarketcap'))
