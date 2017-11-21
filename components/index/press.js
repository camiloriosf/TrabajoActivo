// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import PressItem from './pressItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    textAlign: 'center',
  },
});

class Press extends Component {
  render() {
    const {
      classes,
      press,
      handleClick,
    } = this.props;
    return (
      <div className={classes.root}>
        {
          press.items.map(item => (
            <PressItem
              key={item.alt}
              image={item.image}
              link={press.link}
              alt={item.alt}
              handleClick={handleClick}
            />
          ))
        }
      </div>
    );
  }
}

Press.propTypes = {
  classes: PropTypes.object.isRequired,
  press: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Press);
