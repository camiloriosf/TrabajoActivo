const express = require('express');
const path = require('path');
const next = require('next');
const { generatePDF } = require('./lib/pdf/pdfGenerator');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const i18n = require('./lib/i18n/i18n');

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    preload: ['es'], // preload all langages
    ns: ['common', 'index', 'auth', 'user', 'cv', 'settings', 'error'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json'),
    },
  }, () => {
    // loaded translations we can bootstrap our routes
    app.prepare()
      .then(() => {
        const server = express();
        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18n));

        // serve locales for client
        server.use('/locales', express.static(path.join(__dirname, '/locales')));

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));

        // use next.js
        server.get('/cv/create/:id', (req, res) =>
          app.render(req, res, '/cv/create', { id: req.params.id }));

        server.get('/cv/view/:id', (req, res) => {
          generatePDF({ req, res });
        });

        server.get('*', (req, res) => handle(req, res));

        server.listen(port, (err) => {
          if (err) throw err;
          console.log('> Ready'); // eslint-disable-line no-console
        });
      });
  });
