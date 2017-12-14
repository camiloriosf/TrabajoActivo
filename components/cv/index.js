// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import _ from 'lodash';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import Header from '../common/header';
import SnackFeedback from '../common/snackFeedback';
import TableActions from './tableActions';
import DataTable from './dataTable';
// local imports
import {
  doChangeSnack, doCreateCV, doChangeCVActiveStatus, doCVActiveDBUpdate, doDuplicateCV, doDeleteCV,
} from '../../lib/redux/actions/cv';
import { getCVSDataState, getCVUIState } from '../../lib/reselect/cv';
import { getUserDataState } from '../../lib/reselect/user';

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
  componentDidMount = async () => {
    this.delayedSaving = _.debounce(this.props.doCVActiveDBUpdate, 3000);
  }

  onCVActiveChange = id => (event) => {
    this.props.doChangeCVActiveStatus({ id, value: event.target.checked });
    this.delayedSaving();
  };
  onCVCreateClick = () => {
    this.props.doCreateCV({ name: this.props.t('cvName') });
  }
  onCVCopyClick = ({ id }) => {
    this.props.doDuplicateCV({ id });
  }
  onCVDeleteClick = ({ id }) => {
    this.props.doDeleteCV({ id });
  }
  onSnackFeedbackRequestClose = () => {
    this.props.doChangeSnack({
      openSnackLoading: false,
      openSnackSaving: false,
      openSnackSaved: false,
      openSnackError: false,
    });
  }
  render() {
    const {
      classes,
      t,
      cv,
      ui,
      user,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header email={user.email} />
        <div className={classes.container}>
          <TableActions handleClick={this.onCVCreateClick} buttonsBlocked={ui.buttonsBlocked} />
          <DataTable
            data={cv.data}
            handleChange={this.onCVActiveChange}
            handleCVCopy={this.onCVCopyClick}
            handleCVDelete={this.onCVDeleteClick}
          />
        </div>
        <SnackFeedback
          key="saving"
          open={ui.openSnackSaving}
          text={t('create.snackFeedback.saving')}
          saving
        />
        <SnackFeedback
          key="saved"
          open={ui.openSnackSaved}
          autoHideDuration={2000}
          onRequestClose={this.onSnackFeedbackRequestClose}
          text={t('create.snackFeedback.saved')}
          saved
        />
        <SnackFeedback
          key="error"
          open={ui.openSnackError}
          autoHideDuration={2000}
          onRequestClose={this.onSnackFeedbackRequestClose}
          text={t('create.snackFeedback.error')}
          error
        />
      </div>
    );
  }
}

CV.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  ui: getCVUIState(state),
  cv: getCVSDataState(state),
  user: getUserDataState(state),
});

const mapDispatchToProps = dispatch => ({
  doChangeSnack: bindActionCreators(doChangeSnack, dispatch),
  doCreateCV: bindActionCreators(doCreateCV, dispatch),
  doChangeCVActiveStatus: bindActionCreators(doChangeCVActiveStatus, dispatch),
  doCVActiveDBUpdate: bindActionCreators(doCVActiveDBUpdate, dispatch),
  doDuplicateCV: bindActionCreators(doDuplicateCV, dispatch),
  doDeleteCV: bindActionCreators(doDeleteCV, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('cv')(withStyles(styles)(CV)));
