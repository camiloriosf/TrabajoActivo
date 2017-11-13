// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
});

class Features extends Component {
  render() {
    const {
      classes,
      children,
    } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container justify="space-around" alignItems="center">
          {
            children.map(item => (
              <Grid item xs={12} sm={6} md={4} key={item.props.title}>
                {item}
              </Grid>
            ))
          }
        </Grid>
      </div>
    );
  }
}

Features.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

export default withStyles(styles)(Features);
