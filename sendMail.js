const sendmail = require('sendmail')({
    silent: false,
  })


async function sendMail(candidate, recruiter, jobId, title) {
    return new Promise((resolve, reject)=>{
        sendmail({
            from: 'no-reply@vishal.com',
            to: `${candidate}, ${recruiter}`,
            subject: 'Applied to the job',
            html: `${candidate} applied to the ${jobId} with title ${title}`,
          }, function(err, reply) {
            if (err) reject(err);
            resolve(reply);
        });
    })
}

module.exports = {
    sendMail
}