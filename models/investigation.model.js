const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Investigation = new Schema({
    description: {
        type: String
    },
    error_id: {
        type: String
    },
    error_reason: {
        type: String
    },
    investigator: {
        type: String
    },
    solution: {
        type: String
    }
});

module.exports = mongoose.model('Investigation', Investigation);