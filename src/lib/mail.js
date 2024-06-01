import nodemailer from "nodemailer";
// import * as handlebars from "handlebars";
// import { welcomeTemplate } from "./templates/welcome";

export async function sendMail({
  to,
  subject,
  body,
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: "jurosswebtwopointzero@gmail.com",
      pass: "qffx pamz euoy cyje",
    },
  });
  // try {
  //   const testResult = await transport.verify();
  //   console.log(testResult);
  // } catch (error) {
  //   console.error({ error });
  //   return;
  // }
  await new Promise((resolve, reject) => {
      // verify connection configuration
      transport.verify(function (error, success) {
          if (error) {
              console.log(error);
              reject(error);
          } else {
              console.log("Server is ready to take our messages");
              resolve(success);
          }
      });
  });
  
  // try {
  //   const sendResult = await transport.sendMail({
  //     from: SMTP_EMAIL,
  //     to,
  //     subject,
  //     html: body,
  //   });
  //   console.log(sendResult);
  // } catch (error) {
  //   console.log(error);
  // }
await new Promise((resolve, reject) => {
    // send mail
    transport.sendMail({
      from: "jurosswebtwopointzero@nxtshowapp.vercel.app",
      to,
      subject,
      html: body,
    }, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log(info);
            resolve(info);
        }
    });
});

  
}

// export function compileWelcomeTemplate(name, url) {
//   const template = handlebars.compile(welcomeTemplate);
//   const htmlBody = template({
//     name: name,
//     url: url,
//   });
//   return htmlBody;
// }
