import nodemailer from 'nodemailer';
import dotnet from 'dotenv';

dotnet.config();

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_SECRET
    },
    host: process.env.SITE_URL,
    port: parseInt(process.env.PORT || '0', 10) 
});

export const sendEmail = ({ to, subject, html }: { to: string; subject: string; html: string }) => {
    const options = {
        from: `FeedStock <${process.env.MAIL_EMAIL}>`,
        cc: process.env.CC_EMAIL,
        to,
        subject,
        html
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ', info?.response);
        }
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

