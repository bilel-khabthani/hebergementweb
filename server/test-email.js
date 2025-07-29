import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function sendTestEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.MAIL_USER, // ex: testinginternplatform@gmail.com
        pass: process.env.MAIL_PASS, // ton app password Gmail
      },
    });

    const mailOptions = {
      from: `"Test Sender" <${process.env.MAIL_USER}>`,
      to: 'bilel.khabtani11@gmail.com', // ta boîte de réception pour test
      subject: 'Test Email from Nodemailer',
      text: 'Hello! This is a test email sent using Nodemailer and Gmail SMTP.',
      html: '<p>Hello! This is a <strong>test email</strong> sent using Nodemailer and Gmail SMTP.</p>',
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Test email sent:', info.response);
  } catch (error) {
    console.error('Error sending test email:', error);
  }
}

sendTestEmail();
