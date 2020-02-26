const sgMail = require("@sendgrid/mail");
const sendEmail = (ms, sub, to) => {
  sgMail.setApiKey(process.env.SENDGRID_API);
  const msg = {
    to: to,
    from: "sheduler@example.com",
    subject: sub,
    text: ms
  };
  sgMail.send(msg);
};

module.exports = sendEmail;
