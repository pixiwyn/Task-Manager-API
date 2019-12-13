const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
       from: 'kmarshall@tutamail.com',
        to: email,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
      from: 'kmarshall@tutamail.com',
      to: email,
      subject: 'We sorry to see you go!',
      text: `Hi ${name}, we're sorry to see you go, and would like to know if there's anything we can do better!`
  });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
};