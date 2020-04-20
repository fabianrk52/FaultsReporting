const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Platform = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Platform', Platform);