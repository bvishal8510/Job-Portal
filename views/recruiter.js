let modelInst = require('../models');
let { v4 : uuidv4 } = require('uuid');

async function createJob(req, res) {
    try {
        let title = req.body.title;
        let description = req.body.description;

        if (!title || !description) {
            return res.status(400).send({
                message: "BAD REQUEST: either title or description missing"
            })
        }

        let jobId = uuidv4();

        let job = {
            "title": title,
            "description" : description,
            "userId": req.userId,
            "jobId": jobId
        }

        await modelInst.createJob(job);

        return res.send({
            "sucess":"Scuess"
        })
    }
    catch(err) {
        return res.status(400).send({
            message: err.toString()

        })
    }
}

async function getJobApplies(req, res) {
    try {
        let jobId = req.body.jobId;

        if (!jobId) {
            return res.status(400).send({
                message: "BAD REQUEST: jobId missing"
            })
        }

        let jobRecord = await modelInst.findJobById(jobId);

        if(!jobRecord) {
            return res.status(404).send({
                message: "No such job exists"
            })
        }

        let userListObject = await modelInst.findJobsApplyByJobId(jobId);
        let userList = [];

        for(let i=0;i<userListObject.length;++i) {
            userList.push(userListObject[i]["userId"]);
        }

        let userEmailRecords = await modelInst.findUserByUserIds(userList)

        return res.send({
            "sucess":"Success these have applied",
            "data": userEmailRecords
        })
    }
    catch(err) {
        return res.status(400).send({
            message: err.toString()

        })
    }
}



module.exports = {
    createJob,
    getJobApplies
}