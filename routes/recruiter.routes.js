const express=require("express")
const router=express.Router();

let recruiterInst = require('../views/recruiter');
let userMiddlewareInst = require('../middlewares/user.middleware');

// Handling request using router
router.post("/createjob", userMiddlewareInst.verifyUserAndRole, userMiddlewareInst.verifyRecruiter, recruiterInst.createJob)
router.get("/appliesonjob", userMiddlewareInst.verifyUserAndRole, userMiddlewareInst.verifyRecruiter, recruiterInst.getJobApplies)

// Exporting the router
module.exports=router