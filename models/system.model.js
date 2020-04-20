const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let System = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('System', System);