const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Investigation = new Schema({
    investigation_description: {
        type: String
    },
    investigation_error_id: {
        type: String
    },
    investigation_error_reason: {
        type: String
    },
    investigation_investigator: {
        type: String
    },
    investigation_solution: {
        type: String
    }
});

module.exports = mongoose.model('Investigation', Investigation);