import dotnet from "dotenv";
import nodemailer from "nodemailer";

dotnet.config();

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_SECRET,
  },
  host: process.env.SITE_URL,
  port: parseInt(process.env.PORT || "0", 10),
});

export const sendEmail = ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const options = {
    from: `FeedStock <${process.env.MAIL_EMAIL}>`,
    cc: process.env.CC_EMAIL,
    to,
    subject,
    html,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: ", info?.response);
    }
  });
};

export const sendVerificationEmail = (
  email: string,
  verificationToken: string
) => {
  const verificationUrl = `${process.env.SITE_URL}:${process.env.SITE_PORT}/signup/pending/${verificationToken}`;
  const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>FeedStock Mail</title>
      </head>
      <body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;padding: 2rem;height: auto;">
          <main style="background: #FFFFFF;">
              <div>
                  <h1 style="color: #202123;font-size: 32px;line-height: 40px;">Verify your email address</h1>
                  <p style="color: #353740;font-size: 16px;line-height: 24px;margin-bottom: 1.8rem;">To continue setting up your FeedStock account, please verify that this is your email address.</p>
                  <a style="border: none;
              border-radius: 3px;background: #92a310;
              line-height: 24px;font-size: 16px;
              padding: 12px 11px;text-decoration: none;
              color: #FFFFFF;" href="${verificationUrl}" target="_blank">Verify Email</a>
              </div>
          </main>
      </body>
      </html>
    `;

  sendEmail({
    to: email,
    subject: `FeedStock - Verify your email`,
    html,
  });
};

export const sendErrorEmail = (error: Error) => {
  const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to: process.env.MONITOR_EMAIL,
    subject: "Error Occurred",
    text: error.toString(),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent to monitor :", info.response);
    }
  });
};
