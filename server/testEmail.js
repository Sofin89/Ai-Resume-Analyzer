import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log("Testing with:");
console.log("Service:", process.env.EMAIL_SERVICE);
console.log("User:", process.env.EMAIL_USERNAME);
console.log("Pass length:", process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : 0);

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

async function test() {
    try {
        await transporter.verify();
        console.log("✅ Connection verified successfully!");
        console.log("Attempting to send a test email to yourself...");

        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: process.env.EMAIL_USERNAME,
            subject: "Test Email",
            text: "If you get this, your Nodemailer is working perfectly!"
        });
        console.log("✅ Test email sent perfectly!");
    } catch (error) {
        console.error("❌ ERROR DETAILS \n", error);
    }
}

test();
