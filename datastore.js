var cron = require('node-cron');
var google = require('googleapis');
const asyncLib = require('async');
const axios = require('axios');
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const log = require('ololog').configure({ locate: false });
const AlertModel = require('./AlertModel');

mongoose.Promise = Promise;
mongoose.connect('mongodb://cryptospotlight:12345678abc@ds117848.mlab.com:17848/cryptospotlight', { useNewUrlParser: true });

Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }

// RUN THIS SCRIPT DAILY
// current_time = new Date();

var request = require('request');
var headers = {
    'Accept': 'application/json'
};
var options = {
    url: 'https://sheets.googleapis.com/v4/spreadsheets/1FU5qgalAYC7gcgypm2qgMe8O-VI8gDsmDdjo6Yr7a_Q/values/A1%3AB?key=AIzaSyCIzT7BqKppc4o9emf03YzO3MZv4qa7bN4',
    headers: headers
};

const alertDataObjects = [];

function callback(error, response, body) {

    if (!error && response.statusCode == 200) {

        var json = JSON.parse(body);
        // console.log(json);

        for(var i = 1; i < json.values.length; i++) {
            var obj = json.values[i];
            var symbol = obj[0];
            var dateTime = obj[1];
            var startTime = new Date(dateTime).getUnixTime();

            var object = {
                "symbol": symbol,
                "startTime": startTime,
            }

            alertDataObjects.push(object);
        }

        log("# OF ALERTS DETECTED TO PROCESS",alertDataObjects.length);
        
    } else {
        console.log("nope!");
    }

    //exampleOfDataFromAlertsDB

    asyncLib.eachSeries(alertDataObjects, (alert, callback) => {

        const { startTime, symbol } = alert;
        // log(alert);
        
        // axios.get(`https://beta-pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?CMC_PRO_API_KEY=c165df17-bfc9-4bd5-967d-c61e687c2ce5&symbol=${symbol}&time_start=${startTime}&time_end=${endTime}&count=1008&interval=10m&convert=${tradingPair}`).then(res => {
        
        axios.get(`https://min-api.cryptocompare.com/data/histohour?fsym=${symbol}&tsym=BTC&limit=168&aggregate=1&toTs=${startTime}`).then(res => {

        // log(res.data.Data[1].high);
        // log(res.data.Data[1].low);
        // log(res.data.Data[1].open);
        // log(res.data.Data[1].close);
        // log(res.data.Data[1].time);
        // log(symbol);
    
            AlertModel.findOne({
                _id: {
                    symbol: `${symbol}`,
                    startTime,
                }
            }, (err, alert) => {
                if (alert) {
                    console.log('Alert exists already');
                    log(symbol);
                    log(startTime);
                    callback();
                } else {
                    AlertModel.create({
                        _id: {
                            symbol: `${symbol}`,
                            startTime,
                        },
                        history: res.data.Data.map(i => ({
                            high: i.high,
                            low: i.low,
                            open: i.open,
                            close: i.close,
                            timestamp: i.time
                        }))
                    }, (err, alert) => {
                        if (err) {
                            console.log('error creating alert', err);
                        } else {
                            // console.log('successfully created');
                        }
                        callback();
                    })             
                }            
            });
    
        }).catch(err => console.log('error fetching info'));
    
    }, err => {
        if (err) {
            console.log('error occured in one or more operations', err);
        }
        console.log('done!!!!')
    });
    
}

request(options, callback);

// log(alertDataObjects[290]);


















