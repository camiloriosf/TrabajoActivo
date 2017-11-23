// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  image: {
    height: 60,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    cursor: 'pointer',
  },
});

class PressItem extends Component {
  state = {
    hover: 'off',
  }
  handleClick = () => {
    Router.push(this.props.link);
  }
  handleMouseEnter = () => {
    this.setState({ hover: 'on' });
  }
  handleMouseLeave = () => {
    this.setState({ hover: 'off' });
  }
  render() {
    const {
      classes,
      image,
    } = this.props;
    const { hover } = this.state;
    return (
      <ButtonBase onClick={this.handleClick} disableRipple>
        <img
          src={`${image}-${hover}.png`}
          alt="press"
          className={classes.image}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
      </ButtonBase>
    );
  }
}

PressItem.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default withStyles(styles)(PressItem);
