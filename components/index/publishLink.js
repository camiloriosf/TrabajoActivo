// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import blueGrey from 'material-ui/colors/blueGrey';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    marginTop: 170,
    [theme.breakpoints.down('sm')]: {
      marginTop: 50,
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 100,
    },
  },
  typography: {
    backgroundColor: blueGrey[700],
    color: theme.palette.common.darkWhite,
    padding: 10,
    width: 450,
    margin: '0 auto',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: theme.palette.common.lightWhite,
  },
});

class PublishLink extends Component {
  render() {
    const {
      classes,
      link,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="subheading" className={classes.typography}>
          {link}
        </Typography>
      </div>
    );
  }
}

PublishLink.propTypes = {
  classes: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
};

export default withStyles(styles)(PublishLink);
