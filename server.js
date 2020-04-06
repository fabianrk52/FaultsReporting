const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const reportRoutes = express.Router();
const PORT = 4000;

let Report = require('./models/report.model');
let Investigation = require('./models/investigation.model');
let Platform = require('./models/platform.model');
let SubPlatform = require('./models/sub_platform.model');
let System = require('./models/system.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/reports', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB connection established successfuly");
})

reportRoutes.route('/').get(function (req, res) {
    Report.find(function (err, reports) {
        if (err) {
            console.log(err);
        } else {
            res.json(reports);
        }

    });
});

reportRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Report.findById(id, function (err, report) {
        res.json(report);
    });
});

reportRoutes.route('/add').post(function (req, res) {
    let report = new Report(req.body);
    report.save()
        .then(report => {
            res.status(200).json({
                'report': 'report added successfully'
            });
        })
        .catch(err => {
            res.status(400).send('adding new report failed');
        });
});

reportRoutes.route('/update/:id').put(function (req, res) {
    Report.findById(req.params.id, function (err, report) {
        if (!report) {
            res.status(404).send('not found');
        } else {
            report.report_description = req.body.report_description;
            report.fault_date = req.body.report_fault_date;
            report.report_location = req.body.report_location;
            report.report_platform = req.body.report_platform;
            report.report_sub_platform = req.body.report_sub_platform;
            report.report_platform_num = req.body.report_platform_num;
            report.report_reporting_date = req.body.report_reporting_date;
            report.report_reporter_username = req.body.report_reporter_username;
            report.report_summary = req.body.report_summary;
            report.report_system = req.body.report_system;
            report.save().then(report => {
                    res.json('report updated');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});

app.use('/reports', reportRoutes);

app.listen(PORT, function () {
    console.log("Server running on Port: " + PORT);
});