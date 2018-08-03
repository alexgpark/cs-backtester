const express = require('express');
const mongoose = require('mongoose');
const AlertModel = require('./AlertModel');
const app = express();

mongoose.Promise = Promise;
mongoose.connect('mongodb://cryptospotlight:12345678abc@ds117848.mlab.com:17848/cryptospotlight', { useNewUrlParser: true });

app.get('/alerts', (req, res) => {
    AlertModel.find((err, alerts) => {
        if (err) {
            res.send(err);
        } else {
            res.send(alerts);
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));