const express=require("express")
const router=express.Router();

let recruiterInst = require('../views/candidate');
let userMiddlewareInst = require('../middlewares/user.middleware');

// Handling request using router
router.post("/applyjob", userMiddlewareInst.verifyUserAndRole, userMiddlewareInst.verifyCandidate, recruiterInst.applyJob);
router.get("/listjobs", userMiddlewareInst.verifyUserAndRole, userMiddlewareInst.verifyCandidate, recruiterInst.getAllJobs);
router.get("/appliedjobs", userMiddlewareInst.verifyUserAndRole, userMiddlewareInst.verifyCandidate, recruiterInst.getAppliedJobs);

// Exporting the router
module.exports=router