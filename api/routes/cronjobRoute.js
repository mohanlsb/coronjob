'use strict';
module.exports = function(app) {
  var cronJob = require('../controllers/cronjobController');

  // cronJob Routes
  app.route('/tasks')
    .get(cronJob.list_all_tasks)
    .post(cronJob.create_a_task);

  app.route('/get')
    .get(cronJob.list_all_tasks)
    .post(cronJob.create_a_task);

  app.route('/tasks/:taskId')
    .get(cronJob.read_a_task)
    .put(cronJob.update_a_task)
    .delete(cronJob.delete_a_task);
};