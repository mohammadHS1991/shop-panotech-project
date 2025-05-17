"use server";
import nodemailer from "nodemailer";

// Looking to send emails in production? Check out our Email API/SMTP product!
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2a920646750a55",
    pass: "495b437ebe9615",
  },
  // auth: {
  //   user: "3c428fc3f55a5b",
  //   pass: "1d53be0e65941f",
  // },
});

const mailerEmailUsername = process.env.MAILER_EMAIL_USERNAME;

const mailerEmailPassword = process.env.MAILER_EMAIL_PASSWORD;

// const transporter = nodemailer.createTransport({
//   host: "mail.parsbiotech.ir",
//   port: 465,
//   secure: true,
//   tls: {
//     ciphers: "SSLv3",
//     rejectUnauthorized: false,
//   },
//   auth: {
//     user: mailerEmailUsername,
//     pass: mailerEmailPassword,
//   },
// });

const mailer = async (mail, subject, body) => {
  const options = {
    from: "2a920646750a55",
    // from: "3c428fc3f55a5b",
    // from: mailerEmailUsername,
    to: mail,
    subject: subject,
    html: body,
  };

  try {
    const mail = await transporter.sendMail(options);
    return { message: "success", mail };
  } catch (err) {
    // console.log(`mailer error: ${err}`);
    return { message: "fail", mail };
  }
};

export default mailer;
