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

app.get('/alerts/:id', (req, res) => {
    AlertModel.findOne({_id: req.params.id}, (err, alerts) => {
        if (err) {
            res.send(err);
        } else {
            res.send(alerts);
        }
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));



const express = require('express');
const app = express();
app.get('/hey', (req, res) => {
    res.send('yo!!!!!');
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));