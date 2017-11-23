import React, { Component } from 'react';
// supporting imports
import { translate } from 'react-i18next';
// component imports
import IndexContainer from '../containers/index';
// local imports
import withRoot from '../hoc/withRoot';
import i18n from '../lib/i18n/i18n';

class Index extends Component {
  render() {
    return (
      <div>
        <IndexContainer />
      </div>
    );
  }
}

const Extended = translate(['index', 'common'], { i18n, wait: process.browser })(withRoot(Index));

Extended.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['index', 'common']);
  return {};
};

export default Extended;
