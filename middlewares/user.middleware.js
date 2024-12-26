let constants = require('../constants');
const jwt = require('jsonwebtoken');
let modelInst = require('../models');

async function verifyUserAndRole(req, res, next) {
    try {
        let token = req.headers[constants.TOKEN_HEADER_KEY];

        const verified = jwt.verify(token, constants.JWT_SECRET_KEY);

        if(!verified) {
            return res.status(401).send({
                message: "Invalid token"
            })
        }

        let user = await modelInst.findUser(verified.email);
        req["role"] = user.role;
        req['email'] = user.email;
        req['userId'] = user.userId;
        next();
    }
    catch(err) {
        return res.status(400).send({
            "message": err.toString()
        })
    }
}

async function verifyRecruiter(req, res, next) {
    try {
        if (req.role === constants.RECRUITER) next();
        else {
            return res.status(401).send({
                "message": "INVALID ROUTE"
            })
        }
    }
    catch(err) {
        return res.status(400).send({
            "message": err.toString()
        })
    }
}

async function verifyCandidate(req, res, next) {
    try {
        if (req.role === constants.CANDIDATE) next();
        else {
            return res.status(401).send({
                "message": "INVALID ROUTE"
            })
        }
    }
    catch(err) {
        return res.status(400).send({
            "message": err.toString()
        })
    }
}


module.exports = {
    verifyUserAndRole,
    verifyRecruiter,
    verifyCandidate
}