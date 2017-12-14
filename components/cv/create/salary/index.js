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
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
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
});

class Index extends Component {
  componentDidMount = () => {
    this.delayedSaving = _.debounce(this.props.doSectionDBUpdate, 2000);
  }
  handleChange = name => (event) => {
    this.props.doUpdateSectionDataObject({ name, value: event.target.value });
    this.delayedSaving({ selected: this.props.cv.id });
  };
  handleSwitchChange = name => (event, checked) => {
    this.props.doUpdateSectionDataObject({ name, value: checked });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  render() {
    const {
      classes,
      t,
      cv,
    } = this.props;
    return (
      <div className={classes.root}>
        <SectionHeader
          title={t('create.sections.salary.title')}
          subtitle={t('create.sections.salary.subtitle')}
        >
          <div className={classes.content}>
            a
          </div>
        </SectionHeader>
        <Paper elevation={4} className={classes.paper}>
          <Grid container >
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="from">
                  {
                    cv.data.range
                    ? t('create.sections.salary.fields.from.label')
                    : t('create.sections.salary.fields.salary.label')
                  }
                </InputLabel>
                <Input
                  id="from"
                  placeholder={
                    cv.data.range
                    ? t('create.sections.salary.fields.from.placeholder')
                    : t('create.sections.salary.fields.salary.placeholder')
                  }
                  value={cv.data.from ? cv.data.from : ''}
                  onChange={this.handleChange('from')}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
            </Grid>
            {
              cv.data.range && (
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="to">
                      {t('create.sections.salary.fields.to.label')}
                    </InputLabel>
                    <Input
                      id="to"
                      placeholder={t('create.sections.salary.fields.to.placeholder')}
                      value={cv.data.to ? cv.data.to : ''}
                      onChange={this.handleChange('to')}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </FormControl>
                </Grid>
              )
            }
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={cv.data.range}
                    onChange={this.handleSwitchChange('range')}
                  />
                  }
                label={t('create.sections.salary.fields.range.label')}
              />
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
