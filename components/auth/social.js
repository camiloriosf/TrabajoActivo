// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';
import red from 'material-ui/colors/red';
import indigo from 'material-ui/colors/indigo';
import blue from 'material-ui/colors/blue';


const styles = theme => ({ // eslint-disable-line no-unused-vars
  social: {
    marginTop: 20,
  },
  socialDivider: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  divider: {
    flexGrow: 1,
    margin: 10,
  },
  socialButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
  },
  socialWrapper: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 200,
    padding: 10,
    position: 'relative',
  },
  socialButtonGoogle: {
    width: '100%',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[400],
    },
  },
  socialButtonFacebook: {
    width: '100%',
    backgroundColor: indigo[500],
    '&:hover': {
      backgroundColor: indigo[400],
    },
  },
  socialButtonTwitter: {
    width: '100%',
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[400],
    },
  },
  socialButtonProgress: {
    color: theme.palette.primary[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -15,
    marginLeft: -15,
  },
});

class Social extends Component {
  render() {
    const {
      classes,
      t,
      loading,
      handleSocialLogin,
    } = this.props;
    return (
      <div className={classes.social}>
        <div className={classes.socialDivider}>
          <Divider className={classes.divider} />
          <Typography type="subheading">
            {t('register.signup.social.title')}
          </Typography>
          <Divider className={classes.divider} />
        </div>
        <div className={classes.socialButtons}>
          <div className={classes.socialWrapper}>
            <Button
              raised
              color="accent"
              className={classes.socialButtonGoogle}
              onClick={handleSocialLogin('google')}
              disabled={loading}
            >
              {t('register.signup.social.google')}
            </Button>
            {loading && <CircularProgress size={30} className={classes.socialButtonProgress} />}
          </div>
          <div className={classes.socialWrapper}>
            <Button
              raised
              color="accent"
              className={classes.socialButtonFacebook}
              onClick={handleSocialLogin('facebook')}
              disabled={loading}
            >
              {t('register.signup.social.facebook')}
            </Button>
            {loading && <CircularProgress size={30} className={classes.socialButtonProgress} />}
          </div>
          <div className={classes.socialWrapper}>
            <Button
              raised
              color="accent"
              className={classes.socialButtonTwitter}
              onClick={handleSocialLogin('twitter')}
              disabled={loading}
            >
              {t('register.signup.social.twitter')}
            </Button>
            {loading && <CircularProgress size={30} className={classes.socialButtonProgress} />}
          </div>
        </div>
      </div>
    );
  }
}

Social.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSocialLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Social.defaultProps = {
  loading: false,
};

export default translate('auth')(withStyles(styles)(Social));
