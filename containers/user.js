// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
// component imports
import Header from '../components/user/header';
import Options from '../components/user/options';
// local imports
import { user } from '../lang/es.json';

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
  head: {
    marginBottom: 50,
  },
});

class User extends Component {
  onHeaderClickHandler = (page) => {
    Router.push(page);
  };
  onCardClickHandler = link => () => {
    Router.push(link);
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header onClickHandler={this.onHeaderClickHandler} header={user.header} />
        <div className={classes.container}>
          <div className={classes.head}>
            <Typography type="headline" color="default" >
              ¡Te damos la bienvenida a eCV!
            </Typography>
            <Typography type="display3" color="default">
              Empieza aquí
            </Typography>
          </div>
          <Options handleClick={this.onCardClickHandler} options={user.options} />
        </div>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
