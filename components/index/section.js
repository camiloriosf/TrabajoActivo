// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    textAlign: 'center',
    padding: 10,
  },
  title: {
    fontSize: 30,
    color: theme.palette.common.darkBlack,
    marginTop: 40,
    marginBottom: 40,
  },
  icon: {
    backgroundColor: theme.palette.primary[500],
    margin: '0 auto',
    borderRadius: '50%',
    marginTop: 40,
    padding: 15,
    width: 30,
    height: 30,
  },
});

class Section extends Component {
  render() {
    const {
      classes,
      icon,
      title,
      children,
    } = this.props;
    return (
      <div className={classes.root}>
        {
          icon && (
            <div className={classes.icon}>
              {icon}
            </div>
          )
        }
        <Typography type="body1" color="inherit" className={classes.title} >
          {title}
        </Typography>
        {children}
      </div>
    );
  }
}

Section.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.object,
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

Section.defaultProps = {
  icon: null,
};

export default withStyles(styles)(Section);
