import React, { Component } from 'react';
// supporting imports
import { translate } from 'react-i18next';
import Head from 'next/head';
import ReactGA from 'react-ga';
// component imports
import CookiesContainer from '../components/cookies/index';
// local imports
import withRoot from '../lib/hoc/withRoot';
import i18n from '../lib/i18n/i18n';

class Cookies extends Component {
  componentDidMount = () => {
    ReactGA.initialize('UA-100581684-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  render() {
    return (
      <div>
        <Head>
          <title>TrabajoActivo - Política de Cookies</title>
        </Head>
        <CookiesContainer />
      </div>
    );
  }
}

const Extended = translate(['index', 'common'], { i18n, wait: process.browser })(withRoot(Cookies));

Extended.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['index', 'common']);
  return {};
};

export default Extended;
