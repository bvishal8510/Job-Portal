const express=require("express")
const router=express.Router();

let UserInst = require('../views/user');


// Handling request using router
router.post("/signup", UserInst.createUser)
router.post("/login", UserInst.loginUser)

// Exporting the router
module.exports=router