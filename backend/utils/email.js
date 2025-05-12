const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transport = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  const transporter = nodemailer.createTransport(transport);

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: `${options.message}\n\nLive Location: ${options.location}`,
    html: `<p>${options.message}</p><p><strong>Live Location:</strong> ${options.location}</p>`,
  };

  try {
    await transporter.sendMail(message);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
