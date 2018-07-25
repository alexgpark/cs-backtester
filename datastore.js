const asyncLib = require('async');
const axios = require('axios');
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const log = require('ololog').configure({ locate: false });
const AlertModel = require('./AlertModel');

mongoose.Promise = Promise;
mongoose.connect('mongodb://cryptospotlight:12345678abc@ds117848.mlab.com:17848/cryptospotlight', { useNewUrlParser: true });

// RUN THIS SCRIPT DAILY

// API CALL TO A GOOGLE SHEET WE MANAGE
const exampleOfDataFromAlertsDB = [
    {
        "symbol": "ETH",
        "tradingPair": "BTC",
        "startTime": 1531180800,
        "endTime": 1531785600
    },
    {
        "symbol": "LTC",
        "tradingPair": "BTC",
        "startTime": 1531180800,
        "endTime": 1531785600
    }
];

asyncLib.eachSeries(exampleOfDataFromAlertsDB, (alert, callback) => {
    const { endTime, startTime, symbol, tradingPair } = alert;

    axios.get(`https://beta-pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?CMC_PRO_API_KEY=c165df17-bfc9-4bd5-967d-c61e687c2ce5&symbol=${symbol}&time_start=${startTime}&time_end=${endTime}&count=1008&interval=10m&convert=${tradingPair}`).then(res => {

        AlertModel.findOne({
            _id: {
                tradingPair: `${symbol}/${tradingPair}`,
                startTime,
                endTime
            }
        }, (err, alert) => {
            if (alert) {
                console.log('Alert exist already');
                callback();
            } else {
                AlertModel.create({
                    _id: {
                        tradingPair: `${symbol}/${tradingPair}`,
                        startTime,
                        endTime
                    },
                    history: res.data.data.quotes.map(i => ({
                        price: i.quote.BTC.price,
                        timestamp: moment(i.timestamp).unix()
                    }))
                }, (err, alert) => {
                    if (err) {
                        console.log('error creating alert', err);
                    } else {
                        console.log('successfully created');
                    }
                    callback();
                })             
            }            
        });

    }).catch(err => console.log('error fetching info from coinmarketcap', err));

}, err => {
    if (err) {
        console.log('error occured in one or more operations', err);
    }
    console.log('done!!!!')
});













