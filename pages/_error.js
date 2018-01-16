import React, { Component } from 'react';
// supporting imports
import ReactGA from 'react-ga';
import { I18nextProvider } from 'react-i18next';
// component imports
import ErrorContainer from '../components/common/_error';
// local imports
import withRoot from '../lib/hoc/withRoot';
import startI18n from '../lib/i18n/startI18n';
import { getTranslation } from '../lib/i18n/translationHelpers';

const lang = 'es';

class Error extends Component {
  static async getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null; // eslint-disable-line
    const translations = await getTranslation(
      lang,
      ['common', 'error'],
      'http://localhost:3000/static/locales/',
    );
    return { statusCode, translations };
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
          <ErrorContainer statusCode={this.props.statusCode} />
        </div>
      </I18nextProvider>
    );
  }
}

export default withRoot(Error);
