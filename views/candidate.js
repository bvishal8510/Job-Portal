let modelInst = require('../models');

let mailInst = require('../sendMail');

async function applyJob(req, res) {
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

        let recruiterRecord = await modelInst.findUserByUserId(jobRecord.userId);

        let jobApplyRecord = await modelInst.findJobApply(req.userId, jobId);

        if(jobApplyRecord) {
            return res.status(409).send({
                message: "already applied to this job"
            })
        }

        let jobApply = {
            "userId": req.userId,
            "jobId": jobId
        }

        await modelInst.createJobApply(jobApply);

        // will send the mail here
        // await mailInst.sendMail(req.email, recruiterRecord.email, jobId, jobRecord.title)

        return res.send({
            "sucess":"Success"
        })
    }
    catch(err) {
        return res.status(400).send({
            message: err.toString()

        })
    }
}

async function getAllJobs(req, res) {
    try {

        let jobRecords = await modelInst.findAllJobs();

        if (jobRecords.length === 0) {
            return res.status(404).send({
                message: "No jobs present"
            })
        }

        return res.send({
            "sucess":"list of jobs Scuess",
            "jobs": jobRecords
        })
    }
    catch(err) {
        return res.status(400).send({
            message: err.toString()

        })
    }
}

async function getAppliedJobs(req, res) {
    try {
        let jobRecords = await modelInst.findJobsApplyByUserId(req.userId);

        if (jobRecords.length === 0) {
            return res.status(404).send({
                message: "No jobs applied"
            })
        }

        return res.send({
            "sucess":"Success applied to",
            "jobs": jobRecords
        })
    }
    catch(err) {
        return res.status(400).send({
            message: err.toString()

        })
    }
}



module.exports = {
    applyJob,
    getAllJobs,
    getAppliedJobs
}