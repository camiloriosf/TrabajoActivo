// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import Typography from 'material-ui/Typography';

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
});

class Footer extends Component {
  render() {
    const {
      classes,
      text,
      children,
      width,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="subheading" className={classes.flex} color="inherit">
          {text}
        </Typography>
        { width !== 'xs' && width !== 'sm' && children }
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default compose(withStyles(styles), withWidth())(Footer);
