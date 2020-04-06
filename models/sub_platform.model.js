const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SubPlatform = new Schema({
    sub_platform_name: {
        type: String
    }
});

module.exports = mongoose.model('SubPlatform', SubPlatform);