// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
// error page
import Error from '../../pages/_error';

const styles = {
  root: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class Actions extends Component {
  state = {
    errorPage: false,
  };
  componentDidMount = () => {
    const {
      apiKey,
      mode,
      oobCode,
    } = this.props.url.query;
    if (mode) {
      switch (mode) {
        case 'resetPassword':
          Router.push({ pathname: '/reset', query: { apiKey, oobCode } });
          break;
        default:
          this.setState({ errorPage: true });
      }
    } else this.setState({ errorPage: true });
  }
  render() {
    const {
      classes,
    } = this.props;
    if (this.state.errorPage) {
      return <Error />;
    }
    return (
      <div className={classes.root}>
        <CircularProgress size={50} />
      </div>
    );
  }
}

Actions.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
};

export default withStyles(styles)(Actions);
