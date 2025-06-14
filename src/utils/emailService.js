const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

/**
 * Send an email using Mailtrap
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 */
const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: '"Artisan Connect" <no-reply@artisanconnect.dev>',
    to,
    subject,
    html,
  });
};

module.exports = { sendEmail };
