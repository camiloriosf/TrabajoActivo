// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Link from 'next/link';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import NotInterestedIcon from 'material-ui-icons/NotInterested';

const styles = theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 100,
    width: 100,
    flexGrow: 1,
    flexBasis: 0,
    color: theme.palette.secondary[500],
    marginRight: 10,
  },
  error: {
    flexGrow: 1,
    flexBasis: 0,
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 400,
  },
  link: {
    color: theme.palette.primary[500],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
/* eslint-disable jsx-a11y/anchor-is-valid */
class Error extends Component {
  render() {
    const {
      classes,
      statusCode,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <NotInterestedIcon className={classes.icon} />
          <Typography type="display4" color="inherit" className={classes.error} >
            {statusCode || t('text1')}
          </Typography>
        </div>
        <Typography type="body2" color="inherit" className={classes.text} >
          {t('text2')}
          <Link href={t('link1.link')}>
            <a className={classes.link} >{t('link1.text')}</a>
          </Link>
        </Typography>
        <Typography type="body2" color="inherit" className={classes.text} >
          {t('text3')}
          <Link href={t('link2.link')}>
            <a className={classes.link} >{t('link2.text')}</a>
          </Link>
        </Typography>
        <Typography type="body2" color="inherit" className={classes.text} >
          {t('text4')}
        </Typography>
      </div>
    );
  }
}

Error.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('error')(withStyles(styles)(Error));
