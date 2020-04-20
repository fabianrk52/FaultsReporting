const router = require('express').Router();
let Report = require('../models/report.model');

// Routes
router.route('/').get((req, res) => {
    Report.find()
      .then(reports => res.json(reports))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req, res) => {
    Report.findById(req.params.id)
      .then(report => res.json(report))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Report deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
    const description = req.body.description;
    //const fault_date = Date.parse(req.body.fault_date);
    const fault_date = req.body.fault_date;
    const location = req.body.location;
    //const platform = Number(req.body.platform);
    const platform = req.body.platform;
    //const platform_num = Number(req.body.platform_num);
    const platform_num = req.body.platform_num; 
    //const reporting_date = Date.parse(req.body.reporting_date);
    const reporting_date = req.body.reporting_date;
    const reporter_username = req.body.reporter_username;
    //const sub_platform = Number(req.body.sub_platform);
    const sub_platform = req.body.sub_platform;     
    //const system = Number(req.body.system);    
    const system = req.body.system;  
    const summary = req.body.summary;    
  
    const newReport = new Report({
        description,
        fault_date, 
        location, 
        platform, 
        platform_num,  
        reporting_date, 
        reporter_username, 
        sub_platform, 
        system, 
        summary,
    });
  
    newReport.save()
    .then(() => res.json('Report added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/update/:id').post((req, res) => {
    Report.findById(req.params.id)
    .then(report => {
        report.description = req.body.description;
        report.fault_date = Date.parse(req.body.fault_date);
        report.location = req.body.location;
        report.platform = Number(req.body.platform);
        report.platform_num = Number(req.body.platform_num); 
        report.reporting_date = Date.parse(req.body.reporting_date);
        report.reporter_username = req.body.reporter_username;
        report.sub_platform = Number(req.body.sub_platform);   
        report.system = Number(req.body.system);    
        report.summary = req.body.summary;

        report.save()
        .then(() => res.json('Report updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;