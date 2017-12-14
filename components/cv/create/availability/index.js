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
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
// component imports
import SectionHeader from '../sectionHeader';
// local imports
import {
  doUpdateSectionDataObject,
  doSectionDBUpdate,
} from '../../../../lib/redux/actions/cv';
import { makeGetSectionDataState } from '../../../../lib/reselect/cv';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  content: {
    marginTop: theme.spacing.unit * 3,
  },
  tipTitle: {
    marginTop: theme.spacing.unit * 3,
  },
  tipSubtitle: {
    marginTop: theme.spacing.unit,
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
  formControl: {
    width: '100%',
  },
});

class Index extends Component {
  componentDidMount = () => {
    this.delayedSaving = _.debounce(this.props.doSectionDBUpdate, 2000);
  }
  handleChange = name => (event) => {
    this.props.doUpdateSectionDataObject({ name, value: event.target.value });
    this.delayedSaving({ selected: this.props.cv.id });
  };
  render() {
    const {
      classes,
      t,
      cv,
    } = this.props;
    return (
      <div className={classes.root}>
        <SectionHeader
          title={t('create.sections.availability.title')}
          subtitle={t('create.sections.availability.subtitle')}
        >
          <div className={classes.content}>
            a
          </div>
        </SectionHeader>
        <Paper elevation={4} className={classes.paper}>
          <Grid container >
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="availability">
                  {t('create.sections.availability.fields.availability.label')}
                </InputLabel>
                <Select
                  value={cv.data.availability ? cv.data.availability : ''}
                  onChange={this.handleChange('availability')}
                  input={<Input name="availability" id="availability" />}
                >
                  <MenuItem value="">
                    <em>{t('create.sections.availability.fields.availability.options.none')}</em>
                  </MenuItem>
                  <MenuItem value="commission">
                    {t('create.sections.availability.fields.availability.options.commission')}
                  </MenuItem>
                  <MenuItem value="freelance">
                    {t('create.sections.availability.fields.availability.options.freelance')}
                  </MenuItem>
                  <MenuItem value="fullTime">
                    {t('create.sections.availability.fields.availability.options.fullTime')}
                  </MenuItem>
                  <MenuItem value="partTime">
                    {t('create.sections.availability.fields.availability.options.partTime')}
                  </MenuItem>
                  <MenuItem value="shifts">
                    {t('create.sections.availability.fields.availability.options.shifts')}
                  </MenuItem>
                  <MenuItem value="trainee">
                    {t('create.sections.availability.fields.availability.options.trainee')}
                  </MenuItem>
                  <MenuItem value="substitution">
                    {t('create.sections.availability.fields.availability.options.substitution')}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const makeMapStateToProps = () => {
  const getDataState = makeGetSectionDataState();
  return (state, props) => getDataState(state, props);
};

const mapDispatchToProps = dispatch => ({
  doUpdateSectionDataObject: bindActionCreators(doUpdateSectionDataObject, dispatch),
  doSectionDBUpdate: bindActionCreators(doSectionDBUpdate, dispatch),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(translate('cv')(withStyles(styles)(Index)));
