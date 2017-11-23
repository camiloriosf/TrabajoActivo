// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Header from '../../components/user/header';
import TableActions from '../../components/user/cv/tableActions';
import DataTable from '../../components/user/cv/dataTable';
import ActionDialog from '../../components/common/actionDialog';
// local imports
import { app, db } from '../../lib/google/firebase';

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
  onActionsClickHandler = async () => {
    try {
      this.setState({ loading: true });
      const userRef = await db.collection('users').doc(this.props.user.uid).get();
      const cvsRef = await db.collection('users').doc(this.props.user.uid).collection('cvs').get();
      if (userRef.data().plan === 'Starter' && cvsRef.docs.length > 0) {
        this.setState({
          title: this.props.t('messages.cvLimit.title'),
          content: this.props.t('messages.cvLimit.content'),
          button: this.props.t('messages.cvLimit.button'),
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
        title: this.props.t('messages.unknown.title'),
        content: this.props.t('messages.unknown.content'),
        button: this.props.t('messages.unknown.button'),
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
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header options t={t} />
        <div className={classes.container}>
          <TableActions
            loading={this.state.loading}
            onClickHandler={this.onActionsClickHandler}
          />
          <DataTable />
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

export default translate('cv')(withStyles(styles)(CV));
