import React, { Component } from 'react';
// supporting imports
import { translate } from 'react-i18next';
import ReactGA from 'react-ga';
// component imports
import ErrorContainer from '../components/common/_error';
// local imports
import withRoot from '../lib/hoc/withRoot';
import i18n from '../lib/i18n/i18n';

class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  componentDidMount = () => {
    ReactGA.initialize('UA-100581684-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <div>
        <ErrorContainer statusCode={this.props.statusCode} />
      </div>
    );
  }
}

const Extended = translate(['error', 'common'], { i18n, wait: process.browser })(withRoot(Error));

Extended.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['error', 'common']);
  return {};
};

export default Extended;
