const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kastytis.slubelis@gmail.com',
        subject: 'Welcome',
        text: `Hello ${name}`
    })
}

const cancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kastytis.slubelis@gmail.com',
        subject: 'Bye',
        text: `Goodbye ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    cancelationEmail
}