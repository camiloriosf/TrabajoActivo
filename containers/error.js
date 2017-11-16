// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Link from 'next/link';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
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

class Error extends Component {
  render() {
    const {
      classes,
      statusCode,
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <NotInterestedIcon className={classes.icon} />
          <Typography type="display4" color="inherit" className={classes.error} >
            {statusCode || 'Oops'}
          </Typography>
        </div>
        <Typography type="body2" color="inherit" className={classes.text} >
          {'Go back to '}
          <Link href="/">
            <a className={classes.link} >main page</a>
          </Link>
        </Typography>
        <Typography type="body2" color="inherit" className={classes.text} >
          {'or contact us '}
          <Link href="/contact">
            <a className={classes.link} >here</a>
          </Link>
        </Typography>
        <Typography type="body2" color="inherit" className={classes.text} >
          and describe your issue
        </Typography>
      </div>
    );
  }
}

Error.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Error);
