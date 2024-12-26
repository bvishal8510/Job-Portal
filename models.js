const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect('mongodb://localhost/jobportal')
    .then(() => console.log('connected to db...'))
    .catch(err => console.error('could not connect', err));
}

const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    active: Boolean,
    userId: {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    }
})

const UserModel = mongoose.model('Users',UserSchema);

async function createUser(user) {
    try {
        const userRecord = new UserModel(user);
        await userRecord.save();
        return "success";
    }
    catch(err){
        console.error("Error occured in saving the user", err);
        throw err;
    }
}

async function findUser(email) {
    try {
        let user = await UserModel.findOne({"email": email});
        return user;
    }
    catch(err){
        console.error("Erro occured in updating the user", err);
        throw err;
    }
}

async function findUserByUserIds(userIdList) {
    try {
        let users = await UserModel.find({userId: {"$in" : userIdList}}, {email:1, _id:0});
        return users;
    }
    catch(err){
        console.error("Erro occured in updating the user", err);
        throw err;
    }
}

async function findUserByUserId(userId) {
    try {
        let user = await UserModel.findOne({"userId": userId});
        return user;
    }
    catch(err){
        console.error("Erro occured in updating the user", err);
        throw err;
    }
}

const jobDetailsSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    jobId : {
        type : String,
        required : true
    }
})

const jobDetailsModel = mongoose.model('jobDetails',jobDetailsSchema);

async function createJob(job) {
    try {
        const jobRecord = new jobDetailsModel(job);
        await jobRecord.save();
        return "success";
    }
    catch(err){
        console.error("Error occured in saving the user", err);
        throw err;
    }
}

async function findAllJobs() {
    try {
        let jobs = await jobDetailsModel.find();
        return jobs;
    }
    catch(err){
        console.error("Erro occured in updating the user", err);
        throw err;
    }
}

async function findJobById(jobId) {
    try {
        let job = await jobDetailsModel.findOne({"jobId":jobId});
        return job;
    }
    catch(err){
        console.error("Erro occured in updating the user", err);
        throw err;
    }
}

const jobApplySchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    jobId : {
        type : String,
        required : true
    }
})

const jobApplyModel = mongoose.model('jobApplys',jobApplySchema);

async function createJobApply(applyRecord) {
    try {
        const jobApplyRecord = new jobApplyModel(applyRecord);
        await jobApplyRecord.save();
        return "success";
    }
    catch(err){
        console.error("Error occured in saving the user", err);
        throw err;
    }
}

async function findJobApply(userId, jobId) {
    try {
        let jobApply = await jobApplyModel.findOne({"userId": userId, "jobId": jobId});
        return jobApply;
    }
    catch(err){
        console.error("Erro occured in updating the user", err);
        throw err;
    }
}

async function findJobsApplyByUserId(userId) {
    try {
        let jobApply = await jobApplyModel.find({"userId": userId});
        return jobApply;
    }
    catch(err){
        console.error("Erro occured in updating the user", err);
        throw err;
    }
}

async function findJobsApplyByJobId(jobId) {
    try {
        let jobApply = await jobApplyModel.find({"jobId": jobId},{userId:1, _id:0});
        return jobApply;
    }
    catch(err){
        console.error("Erro occured in updating the user", err);
        throw err;
    }
}



module.exports = {
    connectToDB,
    createUser,
    findUser,
    createJob,
    findAllJobs,
    findJobApply,
    createJobApply,
    findJobById,
    findUserByUserId,
    findJobsApplyByUserId,
    findJobsApplyByJobId,
    findUserByUserIds
}

