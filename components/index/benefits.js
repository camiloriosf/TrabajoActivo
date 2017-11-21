// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import BenefitsItem from './benefitsItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
    margin: '0 auto',
  },
});

class Benefits extends Component {
  render() {
    const {
      classes,
      benefits,
    } = this.props;
    return (
      <div className={classes.root}>
        {
          benefits.map(item => (
            <BenefitsItem
              key={item.title}
              title={item.title}
              body={item.body}
              image={item.image}
              reverse={item.reverse}
              noDivider={item.noDivider}
            />
          ))
        }
      </div>
    );
  }
}

Benefits.propTypes = {
  classes: PropTypes.object.isRequired,
  benefits: PropTypes.array.isRequired,
};

export default withStyles(styles)(Benefits);
