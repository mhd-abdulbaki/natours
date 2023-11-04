// // eslint-disable-next-line import/no-extraneous-dependencies
// const nodemailer = require("nodemailer");

// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.firstname = user.name.split(" ")[0];
//     this.url = url;
//     this.from = `Mhd 3bdulbaki <${process.env.EMAIL_FROM}>`;
//   }
//   // eslint-disable-next-line lines-between-class-members
//   createTransport() {
//     if (process.env.NODE_ENV === "production") {
//       //Sendgrid
//       return 1;
//     }
//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//       //Activate in gmail "less secue app" option
//     });
//   }

//   send(template, subject) {
//     //1) Render HTML based on a pug temeplete
//     // useEffect(()=>{})

//     //2) Define eamil options
//     const mailOptions = {
//       from: "Mhd 3bdulbaki <mhd@3bdulbaki.com>",
//       to: options.email,
//       subject: options.subject,
//       text: options.message,
//       // html: options.html
//     };

//     //3) Create a transport and send email
//   }

//   sendWelcome() {
//     this.send("Welcome", "Welcome to the Natours Family!");
//   }
// };

// const sendEmail = async (options) => {
//   //2) Define the email options
//   const mailOptions = {
//     from: "Mhd 3bdulbaki <mhd@3bdulbaki.com>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     // html: options.html
//   };
//   //3) Actually send the email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = { sendEmail };
