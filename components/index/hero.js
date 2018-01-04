// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
    minHeight: '90vh',
    background: 'no-repeat center',
    backgroundSize: 'cover',
    backgroundPositionX: '50%',
    backgroundPositionY: '41%',
    textAlign: 'center',
  },
});

class Hero extends Component {
  shouldComponentUpdate = () => false
  render() {
    const {
      classes,
      image,
      children,
    } = this.props;
    return (
      <div className={classes.root} style={{ backgroundImage: `url(${image})` }}>
        {children}
      </div>
    );
  }
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
};

export default withStyles(styles)(Hero);
