// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
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
      link,
      handleClick,
    } = this.props;
    const { hover } = this.state;
    return (
      <ButtonBase onClick={handleClick(link)} disableRipple>
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
  handleClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(PressItem);
