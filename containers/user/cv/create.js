// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Header from '../../../components/user/header';
// local imports
import { user } from '../../../lang/es.json';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
});

class Create extends Component {
  onHeaderClickHandler = (page) => {
    Router.push(page);
  };
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header
          onClickHandler={this.onHeaderClickHandler}
          header={user.header}
        />
      </div>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Create);
