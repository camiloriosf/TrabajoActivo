const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const user = functions.config().gmail.email;
const pass = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
});

exports.sendWelcomeEmail = functions.auth.user().onCreate((event) => {
  // Get the uid and display name of the newly created user.
  const to = event.data.email;
  const mailOptions = {
    from: '"Bittersweet.io" <noreply@bittersweet.io>',
    to,
    bcc: 'camilo.rios.f@gmail.com',
    subject: 'Bienvenido a eCV',
    text: 'Gracias por registrarte a eCV. Ingresa y crea tu primer CV.',
    html: '<p>Gracias por registrarte a eCV.</p><p>Ingresa y crea tu primer CV.</p>',
  };

  // Send a welcome email to the newly created user.
  // The sendEmail() method is left as an exercise to the reader.
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New welcome email sent to:', to);
  }).catch((error) => {
    console.error('There was an error while sending the email:', error);
  });
});
