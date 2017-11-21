// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    maxWidth: 300,
    textAlign: 'left',
    margin: 20,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      margin: 0,
      textAlign: 'center',
      display: 'inline',
    },
  },
  title: {
    color: theme.palette.common.darkBlack,
    fontSize: 20,
    marginBottom: 10,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      margin: 0,
      textAlign: 'center',
      display: 'inline',
      marginBottom: 0,
    },
  },
  subTitle: {
    color: theme.palette.common.lightBlack,
  },
});

class FeaturesItem extends Component {
  render() {
    const {
      classes,
      title,
      body,
      icon,
    } = this.props;
    return (
      <div className={classes.root}>
        <div>
          {icon}
        </div>
        <div>
          <Typography type="subheading" color="inherit" className={classes.title} >
            {title}
          </Typography>
          <Typography type="body2" color="inherit" className={classes.subTitle} >
            {body}
          </Typography>
        </div>
      </div>
    );
  }
}

FeaturesItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeaturesItem);
