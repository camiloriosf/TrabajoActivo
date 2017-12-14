// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
// component imports
import Header from '../../common/header';
import SnackFeedback from '../../common/snackFeedback';
import EditDrawer from './editDrawer';
import EditDialog from './editDialog';
import SectionTitle from './sectionTitle';
import NavButtons from './navButtons';
import Personal from './personal/index';
import Summary from './summary/index';
import Skills from './skills/index';
import Experience from './experience/index';
import Education from './education/index';
import Language from './language/index';
import Certificates from './certificates/index';
import References from './references/index';
import Salary from './salary/index';
import Availability from './availability/index';
// local imports
import {
  doItemHiddenChange,
  doUpdateNavArrows,
  doChangeEditDialogOpenState,
  doChangeSnack,
  doChangeSelectedSection,
  doDragEnd,
  doChangeCVName,
  doCVSectionsDBUpdate,
  doCVNameDBUpdate,
} from '../../../lib/redux/actions/cv';
import {
  getCVDataState,
  getCVUIState,
} from '../../../lib/reselect/cv';
import { getUserDataState } from '../../../lib/reselect/user';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  container: {
    display: 'flex',
    alignItems: 'stretch',
  },
  form: {
    position: 'relative',
    width: '100%',
    minHeight: 'calc(100vh - 113px)',
  },
  sections: {
    marginBottom: 100,
  },
});

class Index extends Component {
  componentDidMount = async () => {
    this.delayedSaving = _.debounce(this.props.doCVSectionsDBUpdate, 3000);
    this.delayedNameSaving = _.debounce(this.props.doCVNameDBUpdate, 2000);
  }
  onDragEnd = (result) => {
    this.props.doDragEnd({
      result,
      sections: this.props.cv.sections,
      selected: this.props.ui.selected,
      openSnackSaving: this.props.ui.openSnackSaving,
    });
    this.delayedSaving({ id: this.props.cv.id });
  }
  onItemClick = id => () => {
    this.props.doChangeSelectedSection({ id, sections: this.props.cv.sections });
    this.props.doChangeEditDialogOpenState({ open: false });
  }
  onItemHiddenClick = id => () => {
    this.props.doItemHiddenChange(id);
    this.delayedSaving({ id: this.props.cv.id });
  }
  onNavChange = action => () => {
    this.props.doUpdateNavArrows({
      action,
      sections: this.props.cv.sections,
      selected: this.props.ui.selected,
    });
  }
  onNavMenuClick = () => {
    this.props.doChangeEditDialogOpenState({ open: true });
  }
  onEditDialogRequestClose = () => {
    this.props.doChangeEditDialogOpenState({ open: false });
  }
  onCVNameChange = (event) => {
    this.props.doChangeCVName({ value: event.target.value });
    this.delayedNameSaving({ id: this.props.cv.id });
  }
  onSnackFeedbackRequestClose = () => {
    this.props.doChangeSnack({
      openSnackLoading: false,
      openSnackSaving: false,
      openSnackSaved: false,
      openSnackError: false,
    });
  }
  renderSections = () => {
    switch (this.props.ui.selected) {
      case 'personal':
        return <Personal id={this.props.ui.selected} />;
      case 'summary':
        return <Summary id={this.props.ui.selected} />;
      case 'skills':
        return <Skills id={this.props.ui.selected} />;
      case 'experience':
        return <Experience id={this.props.ui.selected} />;
      case 'education':
        return <Education id={this.props.ui.selected} />;
      case 'language':
        return <Language id={this.props.ui.selected} />;
      case 'certificates':
        return <Certificates id={this.props.ui.selected} />;
      case 'references':
        return <References id={this.props.ui.selected} />;
      case 'salary':
        return <Salary id={this.props.ui.selected} />;
      case 'availability':
        return <Availability id={this.props.ui.selected} />;
      default:
        return null;
    }
  }
  render() {
    const {
      classes,
      t,
      user,
      cv,
      ui,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header email={user.email} />
        <div className={classes.container}>
          <Hidden smDown>
            <EditDrawer
              items={cv.sections}
              selected={ui.selected}
              onDragEnd={this.onDragEnd}
              handleItemHiddenClick={this.onItemHiddenClick}
              handleItemClick={this.onItemClick}
            />
          </Hidden>
          <div className={classes.form}>
            <div className={classes.sections}>
              <SectionTitle name={cv.name} handleChange={this.onCVNameChange} />
              {this.renderSections()}
            </div>
            <NavButtons
              first={ui.first}
              last={ui.last}
              onNavChange={this.onNavChange}
              onMenuClick={this.onNavMenuClick}
            />
            <EditDialog
              open={ui.editDialog}
              items={cv.sections}
              selected={ui.selected}
              onDragEnd={this.onDragEnd}
              handleItemHiddenClick={this.onItemHiddenClick}
              handleItemClick={this.onItemClick}
              handleRequestClose={this.onEditDialogRequestClose}
            />
          </div>
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

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: getUserDataState(state),
  cv: getCVDataState(state),
  ui: getCVUIState(state),
});

const mapDispatchToProps = dispatch => ({
  doChangeSelectedSection: bindActionCreators(doChangeSelectedSection, dispatch),
  doItemHiddenChange: bindActionCreators(doItemHiddenChange, dispatch),
  doUpdateNavArrows: bindActionCreators(doUpdateNavArrows, dispatch),
  doChangeEditDialogOpenState: bindActionCreators(doChangeEditDialogOpenState, dispatch),
  doDragEnd: bindActionCreators(doDragEnd, dispatch),
  doCVSectionsDBUpdate: bindActionCreators(doCVSectionsDBUpdate, dispatch),
  doChangeSnack: bindActionCreators(doChangeSnack, dispatch),
  doChangeCVName: bindActionCreators(doChangeCVName, dispatch),
  doCVNameDBUpdate: bindActionCreators(doCVNameDBUpdate, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('cv')(withStyles(styles)(Index)));
