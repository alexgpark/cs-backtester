const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlertSchema = new Schema({
    _id: {
        symbol: String,
        startTime: Number,
    },
    history: [Schema.Types.Mixed]
});
module.exports = mongoose.model('Alert', AlertSchema);