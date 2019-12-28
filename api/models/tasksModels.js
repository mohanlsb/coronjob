'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TasksSchema = new Schema({
  email:{
    type: String,
    required: 'Kindly enter the email of the task'
  },
  tasks: [{
    type: String,
    required: 'task info'
  }]
});

module.exports = mongoose.model('tasks', TasksSchema);

var taskmodel = mongoose.model('tasks', TasksSchema ,'tasks');


module.exports.getTasksData = async function(queryBody) {
//   console.log("hello again 12345678",queryBody)
  return taskmodel
  .aggregate([
    {
      $match:{email:queryBody.email}
    },
    {
      $project : {
          'email':1,
        'tasks':1
      }
    }
  ])
    .allowDiskUse(true)
    .exec();
}