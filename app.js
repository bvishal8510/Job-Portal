let express = require('express');
let app = express();
let dbConnectInst = require('./models');
const userRouter = require('./routes/user.routes');
const candidateRouter = require('./routes/candidate.routes');
const recruiterRouter = require('./routes/recruiter.routes');
dbConnectInst.connectToDB();

app.use(express.json()); 
app.use(express.urlencoded({ extended : true})); 

app.use('/users', userRouter);
app.use('/candidates', candidateRouter);
app.use('/recruiter', recruiterRouter);


app.listen(3000,()=>{
    console.log("Started app on 3000")
})