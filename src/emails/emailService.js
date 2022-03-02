const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Wrapper for sending emails
 * 
 * @param {string} emailAddress 
 * @param {string} subject 
 * @param {string} message 
 * 
 * @returns {void}
 */
const sendEmail = (emailAddress, subject, message) => {
    sgMail.send({
        from: 'kaitlyn@kollector.io', // hard-coded for moment
        to: emailAddress,
        subject,
        text: message
    });
};

module.exports = { sendEmail };
