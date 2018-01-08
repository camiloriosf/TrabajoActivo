import React, { Component } from 'react';
// supporting imports
import { translate } from 'react-i18next';
import Head from 'next/head';
// component imports
import ContactContainer from '../components/contact/index';
// local imports
import withRoot from '../lib/hoc/withRoot';
import i18n from '../lib/i18n/i18n';

class Contact extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>TrabajoActivo - Contáctanos</title>
        </Head>
        <ContactContainer />
      </div>
    );
  }
}

const Extended = translate(['index', 'common'], { i18n, wait: process.browser })(withRoot(Contact));

Extended.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['index', 'common']);
  return {};
};

export default Extended;
