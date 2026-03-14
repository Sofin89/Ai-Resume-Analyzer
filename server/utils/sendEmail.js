import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // 1. Create a transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD, // App Password for Gmail
        },
    });

    // 2. Define the email options
    const mailOptions = {
        from: `SmartResume <${process.env.EMAIL_USERNAME}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html, // Optional HTML support
    };

    // 3. Actually send the email
    await transporter.sendMail(mailOptions);
};

export default sendEmail;
