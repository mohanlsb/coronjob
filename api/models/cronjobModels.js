'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  email:{
    type: String,
    required: 'Kindly enter the email of the task'
  },
  tasks: [{
    type: String,
    required: 'task info'
  }]
});

module.exports = mongoose.model('CronJob', TaskSchema);

var cronmodel = mongoose.model('cronjobs', TaskSchema ,'cronjobs');


module.exports.getCronjobData = async function(queryBody) {
  // console.log("hello again")
  return cronmodel
  // .find({}).exec();
  .aggregate([
    {
      $match:{}
    },
    {
      $project : {
        // 'name':1,
        'email':1,
        // 'tasks':1
      }
    }
  ])
    .allowDiskUse(true)
    .exec();
}