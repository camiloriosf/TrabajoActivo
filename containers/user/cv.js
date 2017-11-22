// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Header from '../../components/user/header';
import TableActions from '../../components/user/cv/tableActions';
import DataTable from '../../components/user/cv/dataTable';
// local imports
import { user } from '../../lang/es.json';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  container: {
    padding: 100,
    [theme.breakpoints.down('lg')]: {
      padding: 80,
    },
    [theme.breakpoints.down('md')]: {
      padding: 40,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    },
  },
});

class CV extends Component {
  onHeaderClickHandler = (page) => {
    Router.push(page);
  };
  onHeaderChangeHandler = (event, value) => {
    switch (value) {
      case 0:
        Router.push('/user/cv');
        break;
      case 1:
        Router.push('/user/tests');
        break;
      case 2:
        Router.push('/user/coaching');
        break;
      default:
        break;
    }
  }
  onActionsClickHandler = () => {
    console.log('crear registro en Firestore y pasar id a router');
    const href = '/user/cv/create?id=123123';
    const as = '/user/cv/create';
    Router.push(href, as);
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header
          onClickHandler={this.onHeaderClickHandler}
          header={user.header}
          options
          onChangeHandler={this.onHeaderChangeHandler}
        />
        <div className={classes.container}>
          <TableActions actions={user.cv.actions} onClickHandler={this.onActionsClickHandler} />
          <DataTable table={user.cv.table} />
        </div>
      </div>
    );
  }
}

CV.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CV);
