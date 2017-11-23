// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

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
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -15,
    marginLeft: -15,
  },
});

class TableActions extends Component {
  render() {
    const {
      classes,
      loading,
      onClickHandler,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={4}>
          <Typography type="headline" className={classes.title}>
            {t('actions.title')}
          </Typography>
          <div className={classes.wrapper}>
            <Button
              raised
              color="primary"
              disabled={loading}
              className={classes.buttonCV}
              onClick={onClickHandler}
            >
              {t('actions.button')}
            </Button>
            {loading && <CircularProgress size={30} className={classes.buttonProgress} />}
          </div>
        </Paper>
      </div>
    );
  }
}

TableActions.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
};

TableActions.defaultProps = {
  loading: false,
};

export default translate('cv')(withStyles(styles)(TableActions));
