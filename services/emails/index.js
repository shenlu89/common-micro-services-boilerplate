import nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
const emailSender = async (email, subject, message) => {

    // Generate test SMTP service account from ethereal.email

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_AUTH_USER, // generated ethereal user
            pass: process.env.EMAIL_AUTH_PASS // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '' + process.env.EMAIL_ADMIN, // sender address
        to: '' + email, // list of receivers
        subject: '' + subject, // Subject line
        text: '' + message // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

export default emailSender