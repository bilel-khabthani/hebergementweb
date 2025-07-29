import nodemailer from 'nodemailer';
import transporter from './nodemailer.js'; // Your nodemailer config

const sendSupportEmail = async ({ userEmail, message, ticketId, reply, status }) => {
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
      from: `"Support MEMO" <${process.env.MAIL_USER}>`,
      to: reply ? userEmail : 'bilel.khabtani11@gmail.com', // Reply to user, creation to support
      subject: reply ? `Reply to Support Ticket #${ticketId}` : `New Support Ticket #${ticketId}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 40px;">
          <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px 40px; border-radius: 12px; box-shadow: 0 0 15px rgba(0,0,0,0.1); border-left: 6px solid #ff1a1a;">
            <h2 style="color: #000; text-align: center; font-size: 24px; margin-bottom: 30px;">
              ${reply ? `Reply to Support Ticket #${ticketId}` : `New Support Ticket #${ticketId}`}
            </h2>
            <p style="font-size: 16px; color: #333;">User Email: <strong>${userEmail}</strong></p>
            ${reply ? `
              <p style="font-size: 16px; color: #333;">Reply from Support:</p>
              <p style="font-size: 16px; color: #555; padding: 15px; background-color: #e6f3ff; border-radius: 8px;">${reply}</p>
              <p style="font-size: 16px; color: #333;">Current Status: <strong>${status}</strong></p>
            ` : ''}
            <p style="font-size: 16px; color: #333;">Original Message:</p>
            <p style="font-size: 16px; color: #555; padding: 15px; background-color: #f0f0f0; border-radius: 8px;">${message}</p>
            <p style="font-size: 14px; color: #999; margin-top: 40px;">— The MEMO Support Team</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`${reply ? 'Reply' : 'Support'} email sent successfully:`, info.response);
  } catch (error) {
    console.error(`Error sending ${reply ? 'reply' : 'support'} email:`, {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    throw new Error(`Failed to send ${reply ? 'reply' : 'support'} email: ${error.message}`);
  }
};

export default sendSupportEmail;