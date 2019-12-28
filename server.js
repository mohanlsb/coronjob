// var express = require('express'),
//   app = express(),
//   port = process.env.PORT || 3000;

// app.listen(port);

// console.log('CRON job RESTful API server started on: ' + port);

var express = require('express'),
  schedulers = require('./api/cronJobScheduler/scheduler'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  // Task = require('./api/models/cronjobModels'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CronJOB'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




var routes = require('./api/routes/cronjobRoute'); //importing route
routes(app); //register the route


app.listen(port);

// schedulers.scheduler();

var CronJob = require('cron').CronJob;
new CronJob('30 * * * * *', function() {
  // console.log('You will see this message every second');
  schedulers.scheduler();
}, null, true, 'America/Los_Angeles');


// console.log('CRON job RESTful API server started on: ' + port);