// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Link from 'next/link';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import NotInterestedIcon from 'material-ui-icons/NotInterested';
// local imports
import { error } from '../lang/es.json';

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
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <NotInterestedIcon className={classes.icon} />
          <Typography type="display4" color="inherit" className={classes.error} >
            {statusCode || error.text1}
          </Typography>
        </div>
        <Typography type="body2" color="inherit" className={classes.text} >
          {error.text2}
          <Link href={error.link1.link}>
            <a className={classes.link} >{error.link1.text}</a>
          </Link>
        </Typography>
        <Typography type="body2" color="inherit" className={classes.text} >
          {error.text3}
          <Link href={error.link2.link}>
            <a className={classes.link} >{error.link2.text}</a>
          </Link>
        </Typography>
        <Typography type="body2" color="inherit" className={classes.text} >
          {error.text4}
        </Typography>
      </div>
    );
  }
}

Error.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Error);
