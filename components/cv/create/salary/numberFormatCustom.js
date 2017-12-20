// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

class NumberFormatCustom extends Component {
  render() {
    return (
      <NumberFormat
        {...this.props}
        thousandSeparator="."
        decimalSeparator=","
      />
    );
  }
}

NumberFormatCustom.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default NumberFormatCustom;
