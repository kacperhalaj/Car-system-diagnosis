const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '', // Twój email
        pass: '' // Twoje 16-sto znakowe hasło
    }
});

const sendEmail = (to, subject, text, newPassword) => {
    const mailOptions = {
        from: 'CarService',
        to: to,
        subject: subject,
        text: `${text}\n\nTwoje nowe hasło: ${newPassword}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};

module.exports = sendEmail;