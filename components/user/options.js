// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import OptionCard from './optionCard';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

class Options extends Component {
  render() {
    const {
      classes,
      options,
      handleClick,
    } = this.props;
    return (
      <div className={classes.root}>
        <OptionCard
          title={options[0].title}
          body={options[0].body}
          button={options[0].button}
          link={options[0].link}
          image={options[0].image}
          handleClick={handleClick}
        />
        <OptionCard
          title={options[1].title}
          body={options[1].body}
          button={options[1].button}
          link={options[1].link}
          image={options[1].image}
          handleClick={handleClick}
        />
        <OptionCard
          title={options[2].title}
          body={options[2].body}
          button={options[2].button}
          link={options[2].link}
          image={options[2].image}
          handleClick={handleClick}
        />
      </div>
    );
  }
}

Options.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Options);
