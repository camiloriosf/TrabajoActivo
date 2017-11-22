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
import ActionDialog from '../../components/common/actionDialog';
// local imports
import { app, db } from '../../lib/google/firebase';
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
  state = {
    openActionDialog: false,
    title: '',
    content: '',
    button: '',
    loading: false,
  }
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
  onActionsClickHandler = async () => {
    try {
      this.setState({ loading: true });
      const userRef = await db.collection('users').doc(this.props.user.uid).get();
      const cvsRef = await db.collection('users').doc(this.props.user.uid).collection('cvs').get();
      if (userRef.data().plan === 'Starter' && cvsRef.docs.length > 0) {
        this.setState({
          title: 'Ya tienes 1 CV creado',
          content: 'Esta es una versión beta, por lo que por el momento solo permitimos crear 1 CV por usuario',
          button: 'aceptar',
          openActionDialog: true,
          loading: false,
        });
      } else {
        const cvDoc = await db.collection('users').doc(this.props.user.uid).collection('cvs')
          .add({
            userId: this.props.user.uid,
            name: 'Mi CV',
            updatedAt: app.firestore.FieldValue.serverTimestamp(),
            visits: 0,
            active: true,
          });
        const href = `/user/cv/create?id=${cvDoc.id}`;
        const as = `/user/cv/create/${cvDoc.id}`;
        Router.push(href, as);
      }
    } catch (error) {
      this.setState({
        title: 'Error Desconocido',
        content: 'Ha ocurrido un error desconocido, por favor contactanos para solucionar este problema.',
        button: 'aceptar',
        openActionDialog: true,
        loading: false,
      });
    }
  }
  onActionDialogRequestCloseHandler = () => {
    this.setState({ openActionDialog: false });
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
          <TableActions
            loading={this.state.loading}
            actions={user.cv.actions}
            onClickHandler={this.onActionsClickHandler}
          />
          <DataTable table={user.cv.table} />
        </div>
        <ActionDialog
          open={this.state.openActionDialog}
          title={this.state.title}
          content={this.state.content}
          button={this.state.button}
          handleRequestClose={this.onActionDialogRequestCloseHandler}
        />
      </div>
    );
  }
}

CV.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CV);
