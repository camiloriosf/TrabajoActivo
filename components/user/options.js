// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import OptionCard from './optionCard';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

class Options extends Component {
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <OptionCard
          title={t('options.0.title')}
          body={t('options.0.body')}
          button={t('options.0.button')}
          link={t('options.0.link')}
          image={t('options.0.image')}
        />
        {/* <OptionCard
          title={t('options.1.title')}
          body={t('options.1.body')}
          button={t('options.1.button')}
          link={t('options.1.link')}
          image={t('options.1.image')}
        />
        <OptionCard
          title={t('options.2.title')}
          body={t('options.2.body')}
          button={t('options.2.button')}
          link={t('options.2.link')}
          image={t('options.2.image')}
        /> */}
      </div>
    );
  }
}

Options.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('user')(withStyles(styles)(Options));
