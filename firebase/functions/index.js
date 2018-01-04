/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

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
  const to = event.data.email;
  const mailOptions = {
    from: '"Bittersweet.io" <noreply@bittersweet.io>',
    to,
    bcc: 'camilo.rios.f@gmail.com',
    subject: 'Bienvenido a eCV',
    text: 'Gracias por registrarte a eCV. Ingresa y crea tu primer CV.',
    html: '<p>Gracias por registrarte a eCV.</p><p>Ingresa y crea tu primer CV.</p>',
  };
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New welcome email sent to: ', to);
  }).catch((error) => {
    console.error('There was an error while sending the email: ', error);
  });
});

exports.sendContactEmail = functions.firestore.document('contacts/{contactId}').onCreate((event) => {
  const {
    name,
    email,
    message,
  } = event.data.data();
  const mailOptions = {
    from: '"Bittersweet.io" <noreply@bittersweet.io>',
    to: email,
    bcc: 'camilo.rios.f@gmail.com',
    subject: 'Hemos recibido tu mensaje',
    text: `Hola ${name}, gracias por escribirnos. Nos pondremos en contacto a la brevedad. Mensaje: ${message}`,
    html: `<p>Hola ${name},</p><p>Gracias por escribirnos, nos pondremos en contacto a la brevedad.</p><p>Mensaje: ${message}</p>`,
  };
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New welcome email sent to: ', email);
  }).catch((error) => {
    console.error('There was an error while sending the email: ', error);
  });
});

exports.createContactMessage = functions.https.onRequest((req, res) => {
  if (req.method === 'PUT') {
    res.status(403).send('Forbidden!');
  }
  cors(req, res, () => {
    const { name, email, message } = req.body;
    admin.firestore().collection('contacts').add({
      name,
      email,
      message,
    })
      .then(() => {
        console.log(`email: ${email}`);
        res.status(200).send({ saved: true });
      })
      .catch((error) => {
        console.log(`email: ${email}, error: ${error}`);
        res.status(500).send({ saved: false });
      });
  });
});

exports.checkUsername = functions.https.onRequest((req, res) => {
  if (req.method === 'PUT') {
    res.status(403).send('Forbidden!');
  }
  cors(req, res, () => {
    const { username } = req.body;
    admin.firestore().collection('users').where('username', '==', username).get()
      .then((docRef) => {
        console.log(`username: ${username}`);
        res.status(200).send({ username, available: docRef.empty });
      })
      .catch((error) => {
        console.log(`username: ${username}, error: ${error}`);
        res.status(500).send({ username, error });
      });
  });
});

exports.disableUser = functions.https.onRequest((req, res) => {
  if (req.method === 'PUT') {
    res.status(403).send('Forbidden!');
  }
  cors(req, res, () => {
    const { uid } = req.body;
    admin.auth().updateUser(uid, { disabled: true })
      .then(() => {
        admin.firestore().collection('users').doc(uid).update({
          disabled: true,
        })
          .then(() => {
            res.status(200).send({ uid });
          })
          .catch((error) => {
            res.status(500).send({ error });
          });
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
  });
});
