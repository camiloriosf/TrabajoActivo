// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
// component imports
import Header from '../common/header';
import Options from './options';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  container: {
    padding: 100,
    [theme.breakpoints.down('lg')]: {
      padding: 80,
    },
    [theme.breakpoints.down('md')]: {
      padding: 40,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    },
  },
  head: {
    marginBottom: 50,
  },
});

class User extends Component {
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <div className={classes.container}>
          <div className={classes.head}>
            <Typography type="headline" color="default" >
              {t('title')}
            </Typography>
            <Typography type="display3" color="default">
              {t('subtitle')}
            </Typography>
          </div>
          <Options />
        </div>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate('user')(withStyles(styles)(User));
