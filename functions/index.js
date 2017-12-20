const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');

admin.initializeApp(functions.config().firebase);
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

exports.generatePDF = functions.https.onRequest((req, res) => {
  const { id } = req.body;
  const doc = new PDFDocument();
  // const stream = doc.pipe(blobStream());
  admin.firestore().collection('cvs').doc(id).get()
    .then((docRef) => {
      if (docRef.exists) {
        doc.fontSize(25)
          .text('Here is some vector graphics...', 100, 80);
        doc.end();
        doc.pipe(res);
      } else {
        res.send(`id: ${id}, no existe`);
      }
    })
    .catch((error) => {
      res.send(`id: ${id}, error: ${error}`);
    });
});
