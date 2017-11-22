// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    marginBottom: 20,
  },
  paper: {
    display: 'flex',
    height: 70,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginLeft: 20,
    color: theme.palette.grey[700],
  },
  buttonCV: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
});

class TableActions extends Component {
  render() {
    const {
      classes,
      actions,
      onClickHandler,
    } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={4}>
          <Typography type="headline" className={classes.title}>
            {actions.title}
          </Typography>
          <Button raised color="primary" className={classes.buttonCV} onClick={onClickHandler}>
            {actions.button}
          </Button>
        </Paper>
      </div>
    );
  }
}

TableActions.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(TableActions);
