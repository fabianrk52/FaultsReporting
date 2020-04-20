const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    description: {type: String, required: true},
    fault_date: {type: String, required: true},
    location: {type: String, required: true},
    platform: {type: Number, required: true},
    sub_platform: {type: Number},
    platform_num: {type: String, required: true},
    reporting_date: {type: String},
    reporter_username: {type: String},
    summary: {type: String},
    system: {type: Number}
  }, {
    timestamps: true,
  });
  
const Report = mongoose.model('Report', reportSchema);
module.exports =  Report;