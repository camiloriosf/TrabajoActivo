// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
// component imports
import FooterItem from './footerItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.darkBlack,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
    color: theme.palette.common.darkWhite,
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  menu: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
});

class Footer extends Component {
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="subheading" className={classes.flex} color="inherit">
          {t('footer.text')}
        </Typography>
        <div className={classes.menu}>
          <FooterItem
            link={t('footer.items.0.link')}
            text={t('footer.items.0.text')}
            divider
          />
          <FooterItem
            link={t('footer.items.1.link')}
            text={t('footer.items.1.text')}
            divider
          />
          <FooterItem
            link={t('footer.items.2.link')}
            text={t('footer.items.2.text')}
            divider
          />
          <FooterItem
            link={t('footer.items.3.link')}
            text={t('footer.items.3.text')}
          />
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('index')(withStyles(styles)(Footer));
