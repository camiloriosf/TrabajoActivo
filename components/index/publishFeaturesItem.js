// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: 230,
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: 0,
      width: '100%',
      marginTop: 10,
    },
  },
  icon: {
    backgroundColor: theme.palette.common.minBlack,
    margin: '0 auto',
    borderRadius: '50%',
    padding: 15,
    width: 50,
    height: 50,
    [theme.breakpoints.down('sm')]: {
      width: 20,
      height: 20,
      padding: 10,
      marginLeft: 5,
      marginRight: 5,
    },
  },
  typography: {
    color: theme.palette.common.darkWhite,
    marginTop: 10,
    fontSize: 15,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 0,
    },
  },
});

class PublishFeaturesItem extends Component {
  render() {
    const {
      classes,
      icon,
      text,
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.icon}>
          {icon}
        </div>
        <Typography type="body1" className={classes.typography}>
          {text}
        </Typography>
      </div>
    );
  }
}

PublishFeaturesItem.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(PublishFeaturesItem);
