import React, { Component } from 'react';
// supporting imports
import { translate } from 'react-i18next';
import Head from 'next/head';
// component imports
import PrivacyContainer from '../components/privacy/index';
// local imports
import withRoot from '../lib/hoc/withRoot';
import i18n from '../lib/i18n/i18n';

class Privacy extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>Trabajo Activo - Política de Privacidad</title>
        </Head>
        <PrivacyContainer />
      </div>
    );
  }
}

const Extended = translate(['index', 'common'], { i18n, wait: process.browser })(withRoot(Privacy));

Extended.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['index', 'common']);
  return {};
};

export default Extended;
