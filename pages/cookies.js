import React, { Component } from 'react';
// supporting imports
import { I18nextProvider } from 'react-i18next';
import Head from 'next/head';
import ReactGA from 'react-ga';
// component imports
import CookiesContainer from '../components/cookies/index';
// local imports
import withRoot from '../lib/hoc/withRoot';
import startI18n from '../lib/i18n/startI18n';
import { getTranslation } from '../lib/i18n/translationHelpers';

const lang = 'es';
const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://trabajoactivo.com';

class Cookies extends Component {
  static async getInitialProps() {
    const translations = await getTranslation(
      lang,
      ['common', 'index'],
      `${url}/static/locales/`,
    );

    return { translations };
  }

  constructor(props) {
    super(props);

    this.i18n = startI18n(props.translations, lang);
  }

  componentDidMount = () => {
    ReactGA.initialize('UA-100581684-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  render() {
    return (
      <I18nextProvider i18n={this.i18n}>
        <div>
          <Head>
            <title>TrabajoActivo - Política de Cookies</title>
          </Head>
          <CookiesContainer />
        </div>
      </I18nextProvider>
    );
  }
}

export default withRoot(Cookies);
