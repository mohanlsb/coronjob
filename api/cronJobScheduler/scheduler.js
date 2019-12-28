'use strict';

var cronJobDataModel = require('../models/cronjobModels')
var taskDataModel = require('../models/tasksModels')

const sgMail = require('@sendgrid/mail');
var SENDGRID_API_KEY = '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'

var rp = require('request-promise');
var options1 = {
    uri: 'http://3.210.82.109/DrutasWebAPI/User/getUsersByCompany?companyId=1',
    json: true
};
// var taskList = [];
exports.scheduler = function(req, res) {

    rp(options1)
    .then(async function (repos) {
        for (var daat of repos.data) {
            var taskList = [];
            var options2 = {
                uri: 'http://3.210.82.109/DrutasWebAPI/task/GetAllTasksByUser?user='+daat.userLoginId,
                json: true
            };
            await rp(options2)
            .then(function (reposed) {
                
                for (var daats of reposed.data) {
                    if ((new Date().getTime() - new Date(daats.taskAddedDate.slice(0,19)).getTime())/3600000 <= 24) {
                        taskList.push(daats.name)

                    }
                }
                console.log(taskList,'email',daat.userLoginId)

                if (taskList.length > 0) {
                    var allTask = '';
                    for (var taskListCount = 0; taskListCount < taskList.length; taskListCount++) {
                        allTask = `<tr><td style="vertical-align:top;width:26px"> <img height="16" src="https://collaborationapp.s3.amazonaws.com/list-icon.png" width="16" class="CToWUd"></td><td style="vertical-align:top"><a href="#" style="color:#4b4b4b;font-size:14px;text-decoration:none"> `+allTask+taskList[taskListCount].slice(0,20)+` </a></td></tr><br>`
                    }
                    var userName = daat.userLoginId.split('.')[0]
                    console.log(userName)
                    sgMail.setApiKey(SENDGRID_API_KEY);

                    const msg = {
                    to: daat.userLoginId,
                    // to:'mohanlns@yahoo.com',
                    from: 'mohan099943@gmail.com',
                    subject: "Today's Tasks ",
                    text: '@'+daat.userLoginId+" Below are the task provided to you",
                    html: `<div align="left" style="font-size:13px;font-weight:400;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;line-height:1.5;text-align:left;margin:0 auto;padding:0px 20px;"><table cellpadding="0" cellspacing="0" width="100%"><tbody><tr width="100%"><td align="center" valign="top"><table cellpadding="0" cellspacing="0" width=""><tbody><tr><td align="left" width="550" style="border: 1px solid #ccc; border-radius: 30px; padding:0px 20px;"><div style="padding:30px 0px 30px;background-color:white;font-size:15px;line-height:1.2em"><div style="text-align:center;padding-bottom:50px"><img src="https://collaborationapp.s3.amazonaws.com/logo.png" style="max-width:45px;height:auto" class="CToWUd"><h1 style="font-weight:400;font-size:22px;margin:20px 0">Paxcom Daily Digest</h1><h2 style="font-weight:400;font-size:15px;color:#9b9b9b"><strong>`+userName+`,</strong> here's your Paxcom Daily Digest for <strong>`+String(new Date()).slice(0,15)+`</strong></h2></div><div style="margin-bottom:60px"><div style="border-bottom:1px solid #eaeaea;padding-bottom:20px;margin-bottom:20px"> Today's <strong>task list</strong></div><table cellpadding="0" cellspacing="0" width="100%" style="background: #f7f9fa; padding: 16px; border-radius: 8px; overflow: hidden;"><tbody><tr><td style="padding-bottom:3px"> <table> <tbody>
                    `+allTask+`</tbody></table></td></tr></tbody></table></div><div style="text-align:center;font-size:12px;color:#9b9b9b;padding:13px 0;border-top:1px solid #eaeaea"><a href="#" style="display:inline-block;margin-bottom:.5em;color:#259af4;text-decoration:underline">Change notification settings</a> <span style="white-space:nowrap">if you no longer wish to receive these.</span><span aria-hidden="true" style="font-size:0;opacity:0;height:0;width:0;overflow:hidden;display:inline-block">e416</span></div></div></td></tr></tbody></table></td></tr></tbody></table></div>`,
                    };
                    sgMail.send(msg);
                }
            })
            .catch(function (err) {
                // API call failed...
                console.log(err)
            });
        }
        // console.log(taskList,'email')
    })
    .catch(function (err) {
        // API call failed...
        console.log(err)
    });
  };