// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import BenefitsItem from './benefitsItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
    margin: '0 auto',
  },
});

class Benefits extends Component {
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <BenefitsItem
          key={t('benefits.items.0.title')}
          title={t('benefits.items.0.title')}
          body={t('benefits.items.0.body')}
          image={t('benefits.items.0.image')}
        />
        <BenefitsItem
          key={t('benefits.items.1.title')}
          title={t('benefits.items.1.title')}
          body={t('benefits.items.1.body')}
          image={t('benefits.items.1.image')}
          reverse
        />
        <BenefitsItem
          key={t('benefits.items.2.title')}
          title={t('benefits.items.2.title')}
          body={t('benefits.items.2.body')}
          image={t('benefits.items.2.image')}
        />
        <BenefitsItem
          key={t('benefits.items.3.title')}
          title={t('benefits.items.3.title')}
          body={t('benefits.items.3.body')}
          image={t('benefits.items.3.image')}
          reverse
          noDivider
        />
      </div>
    );
  }
}

Benefits.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('index')(withStyles(styles)(Benefits));
