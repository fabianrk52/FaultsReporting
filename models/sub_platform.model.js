const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SubPlatform = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('SubPlatform', SubPlatform);