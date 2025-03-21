let modelInst = require('../models');
let { v4 : uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const constInst = require('../constants');
const bcrypt = require('bcrypt');
const axios = require('axios');

async function createUser(req, res) {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let role = req.body.role;

        if (!email || !password || !role) {
            return res.status(400).send({
                message: "BAD REQUEST: either username or password or role missing"
            })
        }

        if (role !== constInst.CANDIDATE && role !== constInst.RECRUITER) {
            return res.status(400).send({
                message: "BAD REQUEST: Invalid role"
            })
        }

        if (!validateEmail(email)) {
            return res.status(400).send({
                message: "BAD REQUEST: not a proper email"
            })
        }

        let userId = uuidv4();

        let userInSystem = await modelInst.findUser(email);

        if(userInSystem) {
            return res.status(409).send({
                message: "Email already exists"
            })
        }

        const salt = bcrypt.genSaltSync(constInst.SALTROUNDS);
        const hash = bcrypt.hashSync(password, salt);

        let user = {
            "email": email,
            "password" : hash,
            "userId": userId,
            "role": role
        }

        await modelInst.createUser(user);

        return res.send({
            "sucess":"Scuess",
            "userId" : userId
        })
    }
    catch(err) {
        return res.status(400).send({
            message: err.toString()
        })
    }
}

async function loginUser(req, res) {
    try {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            return res.status(400).send({
                message: "BAD REQUEST: either username or password missing"
            })
        }

        if (!validateEmail(email)) {
            return res.status(400).send({
                message: "BAD REQUEST: not a proper email"
            })
        }

        let user = await modelInst.findUser(email);

        if(!user){
            return res.status(404).send({
                message: "User does not exists"
            })
        }

        let result = bcrypt.compareSync(password, user.password);

        if (!result) {
            return res.status(401).send({
                message: "Email or password does not match"
            })
        }

        let data = {
            email : email,
            password : password
        }

        let token = jwt.sign(data, constInst.JWT_SECRET_KEY);

        return res.send({
            "sucess":"login success",
            "token" : token
        })
    }
    catch(err) {
        return res.status(400).send({
            message: err.toString()
        })
    }
}

const validateEmail = (email) => {
    email = email.toLowerCase();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

async function getDataAsync(url) {
    try {
        let result = await axios.get(url);
        return { userId: 1, id: 1, title: 'Test Title', body: 'Test Body' };
    }
    catch(e) {
        throw new Error("Unable to fetch user data")
    }
}

module.exports = {
    createUser,
    loginUser,
    validateEmail,
    getDataAsync
}