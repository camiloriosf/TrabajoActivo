// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import BorderClearIcon from 'material-ui-icons/BorderClear';
import BorderInnerIcon from 'material-ui-icons/BorderInner';
import BorderAllIcon from 'material-ui-icons/BorderAll';
// component imports
import PricesItem from './pricesItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 40,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  pricesItemIcon: {
    color: theme.palette.primary[500], width: 36, height: 36,
  },
});

class Prices extends Component {
  render() {
    const {
      classes,
      items,
      handleClick,
    } = this.props;
    return (
      <div className={classes.root}>
        <PricesItem
          icon={<BorderClearIcon className={classes.pricesItemIcon} />}
          name={items[0].name}
          features={items[0].features}
          price={items[0].price}
          free={items[0].free}
          handleClick={handleClick}
        />
        <PricesItem
          icon={<BorderInnerIcon className={classes.pricesItemIcon} />}
          name={items[1].name}
          features={items[1].features}
          price={items[1].price}
          free={items[1].free}
          handleClick={handleClick}
        />
        <PricesItem
          icon={<BorderAllIcon className={classes.pricesItemIcon} />}
          name={items[2].name}
          features={items[2].features}
          price={items[2].price}
          free={items[2].free}
          handleClick={handleClick}
        />
      </div>
    );
  }
}

Prices.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  handleClick: PropTypes.any.isRequired,
};

export default withStyles(styles)(Prices);
