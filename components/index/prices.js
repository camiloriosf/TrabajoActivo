// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import BorderClearIcon from 'material-ui-icons/BorderClear';
import BorderInnerIcon from 'material-ui-icons/BorderInner';
import BorderAllIcon from 'material-ui-icons/BorderAll';
// component imports
import PricesItem from './pricesItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 40,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  pricesItemIcon: {
    color: theme.palette.primary[500], width: 36, height: 36,
  },
});

class Prices extends Component {
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <PricesItem
          icon={<BorderClearIcon className={classes.pricesItemIcon} />}
          name={t('prices.items.0.name')}
          features={
            [
              { text: t('prices.items.0.features.0.text') },
              { text: t('prices.items.0.features.1.text') },
              { text: t('prices.items.0.features.2.text') },
              { text: t('prices.items.0.features.3.text') },
            ]
          }
          price={t('prices.items.0.price')}
          month={t('prices.month')}
          free
        />
        <PricesItem
          icon={<BorderInnerIcon className={classes.pricesItemIcon} />}
          name={t('prices.items.1.name')}
          features={
            [
              { text: t('prices.items.1.features.0.text') },
              { text: t('prices.items.1.features.1.text') },
              { text: t('prices.items.1.features.2.text') },
              { text: t('prices.items.1.features.3.text') },
            ]
          }
          price={t('prices.items.1.price')}
          month={t('prices.month')}
        />
        <PricesItem
          icon={<BorderAllIcon className={classes.pricesItemIcon} />}
          name={t('prices.items.2.name')}
          features={
            [
              { text: t('prices.items.2.features.0.text') },
              { text: t('prices.items.2.features.1.text') },
              { text: t('prices.items.2.features.2.text') },
              { text: t('prices.items.2.features.3.text') },
            ]
          }
          price={t('prices.items.2.price')}
          month={t('prices.month')}
        />
      </div>
    );
  }
}

Prices.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('index')(withStyles(styles)(Prices));
