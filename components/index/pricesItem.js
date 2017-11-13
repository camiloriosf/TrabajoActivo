// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import AttachMoneyIcon from 'material-ui-icons/AttachMoney';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit,
    width: '20vw',
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
  }),
  name: {
    marginTop: 10,
    marginBottom: 10,
  },
  features: {
    marginTop: 10,
    marginBottom: 10,
  },
  price: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginTop: 20,
  },
  icon: {
    height: 36,
    width: 36,
    color: theme.palette.primary[200],
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
});

class PricesItem extends Component {
  render() {
    const {
      classes,
      icon,
      name,
      features,
      price,
      free,
      handleClick,
    } = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        {icon}
        <Typography type="title" component="h3" className={classes.name}>
          {name}
        </Typography>
        <Divider light />
        <div className={classes.features}>
          {
            features.map(feature =>
              (
                <Typography key={feature.text} type="body1" component="p" paragraph>
                  {feature.text}
                </Typography>
              ))
          }
        </div>
        <Divider light />
        <div className={classes.price}>
          {!free && <AttachMoneyIcon className={classes.icon} />}
          <Typography type="display3" component="h3" className={classes.priceText}>
            {price}
          </Typography>
          {!free && <Typography type="body1" component="h3" className={classes.monthText}>/month</Typography>}
        </div>
        <Button raised color="primary" onClick={handleClick(name)} className={classes.button}>
          Get Started
        </Button>
      </Paper>
    );
  }
}

PricesItem.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  features: PropTypes.array.isRequired,
  price: PropTypes.string.isRequired,
  free: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

PricesItem.defaultProps = {
  free: false,
};

export default withStyles(styles)(PricesItem);
