const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    user_name: {
        type: String
    }
});

module.exports = mongoose.model('User', User);