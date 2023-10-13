const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

// Configure Nodemailer with your email service provider's details
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'harika.krishna99@gmail.com',
    pass: 'bmkkbdjbtdmlhsue',
  },
});

// API endpoint to send an email
app.post('/send-email', (req, res) => {
  const { emailid, otpnumber } = req.body;

  // Email content
  const mailOptions = {
    from: 'harika.krishna99@gmail.com',
    to: emailid, // Replace with your recipient's email address
    subject: 'Otp to login into Digital Parliament',
    html: `
      <p>Otp: ${otpnumber}</p>
     <p>Never share Otp details with others,This otp is valid only for 30 seconds.</p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({error, message: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
