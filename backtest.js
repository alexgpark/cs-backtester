const axios = require('axios');
const log = require('ololog').configure({ locate: false })

const symbol = 'ETH';
const tradingPair = 'BTC';
const startTime = 1531180800;
const endTime = 1531785600;

// const count = 1008;
// const interval = '10m';

const stopLoss = 0.95;
const profitTake = 1.05;

var SLHit = 0;
var PTHit = 0;

// let baseUrl;
// if (process.env.NODE_ENV === 'production') {
//     baseUrl = 'https://cs-alerts.herokuapp.com'
// } else {
//     baseUrl = 'http://localhost:3000'
// }

// axios.get(`${baseUrl}/alerts`).then(res => {
axios.get(`https://cs-alerts.herokuapp.com/alerts`).then(res => {
    
    log("---------------------------------------------");
    log(JSON.stringify(res.data, null, 2));
    log("---------------------------------------------");

    // console.log(res.data);

    // console.log(res.data.status);
    // console.log(res.data.data.quotes);
    // log(res.data.data.quotes[0].quote);

    // log("---------------------------------------------");
    // log("---------------------------------------------");
    // log("---------------------------------------------");

    // const startPrice = res.data.data.quotes[0].quote.BTC.price
    // // log(`StartPrice: ${startPrice}`);

    // // log("---------------------------------------------");
    // // log("---------------------------------------------");
    // // log("---------------------------------------------");

    // // var i;

    // for (i = 0; i < res.data.data.quotes.length; i++) { 
    //     // log("---------------------------------------------");

    //     // console.log(res.data.data.quotes[i].quote.BTC.price);
    //     // log(res.data.data.quotes[i].quote);

    //     const rowPrice = res.data.data.quotes[i].quote.BTC.price;
    //     const timeStamp = res.data.data.quotes[i].timestamp;
    //     const difference = (((rowPrice - startPrice) / startPrice)*100);

    //     // log(rowPrice);

    //     // log(`Row Price: ${rowPrice}`)
    //     // log(`Timestamp: ${timeStamp} `)
    //     // log(`Price Difference: ${difference}`);

    //     const stopLossPrice = startPrice * stopLoss;
    //     const profitPrice = startPrice * profitTake;

    //     if (rowPrice <= stopLossPrice) {

    //         log("STOP LOSS HIT");
    //         log(`Row Price: ${rowPrice}`)
    //         log(`Timestamp: ${timeStamp} `)
    //         log(`Row Number: ${i}`);
    //         // log(SLHit);
    //         SLHit = SLHit + 1;
    //         log(SLHit);
    //         break

    //     } else if (rowPrice >= profitTake) {

    //         log("PROFIT TAKE HIT");
    //         log(`Row Price: ${rowPrice}`)
    //         log(`Timestamp: ${timeStamp} `)
    //         log(`Row Number: ${i}`);
    //         PTHit = PTHit + 1;
    //         log(PTHit);
    //         break

    //     } else {
    //         // log("Still within boundaries");
    //     }
    // }

    // console.log(res.data);
    // console.log(res.data.data.quotes.length);

    
  }).catch(err => console.log('error fetching info from coinmarketcap'))


  
// axios.get(`https://api.coinmarketcap.com/v1/ticker/bitcoin/`).then(res => {

//     console.log(res.data);
    
//   }).catch(err => console.log('error fetching info from coinmarketcap'))
