// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import PressItem from './pressItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    textAlign: 'center',
  },
});

class Press extends Component {
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <PressItem
          image={t('press.items.0.image')}
          link={t('press.link')}
          alt={t('press.items.0.alt')}
        />
        <PressItem
          image={t('press.items.1.image')}
          link={t('press.link')}
          alt={t('press.items.1.alt')}
        />
        <PressItem
          image={t('press.items.2.image')}
          link={t('press.link')}
          alt={t('press.items.2.alt')}
        />
        <PressItem
          image={t('press.items.3.image')}
          link={t('press.link')}
          alt={t('press.items.3.alt')}
        />
        <PressItem
          image={t('press.items.4.image')}
          link={t('press.link')}
          alt={t('press.items.4.alt')}
        />
        <PressItem
          image={t('press.items.5.image')}
          link={t('press.link')}
          alt={t('press.items.5.alt')}
        />
        <PressItem
          image={t('press.items.6.image')}
          link={t('press.link')}
          alt={t('press.items.6.alt')}
        />
      </div>
    );
  }
}

Press.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('index')(withStyles(styles)(Press));
