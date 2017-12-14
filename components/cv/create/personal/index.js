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
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
// component imports
import SectionHeader from '../sectionHeader';
import TipCard from '../tipCard';
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
  render() {
    const {
      classes,
      t,
      cv,
    } = this.props;
    return (
      <div className={classes.root}>
        <SectionHeader
          title={t('create.sections.personal.title')}
          subtitle={t('create.sections.personal.subtitle')}
        >
          <div className={classes.content}>
            <Divider />
            <Typography type="button" className={classes.tipTitle}>
              {t('create.sections.personal.tips.title')}
            </Typography>
            <Typography type="body2" color="secondary" className={classes.tipTitle}>
              {t('create.sections.personal.tips.bodyEmail')}
            </Typography>
            <Grid container >
              <Grid item xs={12} lg={6}>
                <TipCard text={t('create.sections.personal.tips.emailRight')} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TipCard text={t('create.sections.personal.tips.emailWrong')} wrong />
              </Grid>
            </Grid>
            <Typography type="body2" color="secondary" className={classes.tipTitle}>
              {t('create.sections.personal.tips.bodyLinkedin')}
            </Typography>
            <Grid container >
              <Grid item xs={12} lg={6}>
                <TipCard text={t('create.sections.personal.tips.linkedinRight')} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TipCard text={t('create.sections.personal.tips.linkedinWrong')} wrong />
              </Grid>
            </Grid>
          </div>
        </SectionHeader>
        <Paper elevation={4} className={classes.paper}>
          <Grid container >
            <Grid item xs={12} md={4}>
              <TextField
                id="names"
                placeholder={t('create.sections.personal.fields.names.placeholder')}
                label={t('create.sections.personal.fields.names.label')}
                margin="normal"
                value={cv.data.names ? cv.data.names : ''}
                onChange={this.handleChange('names')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="lastNames"
                placeholder={t('create.sections.personal.fields.lastNames.placeholder')}
                label={t('create.sections.personal.fields.lastNames.label')}
                margin="normal"
                value={cv.data.lastNames ? cv.data.lastNames : ''}
                onChange={this.handleChange('lastNames')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="email"
                placeholder={t('create.sections.personal.fields.email.placeholder')}
                label={t('create.sections.personal.fields.email.label')}
                margin="normal"
                value={cv.data.email ? cv.data.email : ''}
                onChange={this.handleChange('email')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="phone"
                placeholder={t('create.sections.personal.fields.phone.placeholder')}
                label={t('create.sections.personal.fields.phone.label')}
                margin="normal"
                value={cv.data.phone ? cv.data.phone : ''}
                onChange={this.handleChange('phone')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="address"
                placeholder={t('create.sections.personal.fields.address.placeholder')}
                label={t('create.sections.personal.fields.address.label')}
                margin="normal"
                value={cv.data.address ? cv.data.address : ''}
                onChange={this.handleChange('address')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="web"
                placeholder={t('create.sections.personal.fields.web.placeholder')}
                label={t('create.sections.personal.fields.web.label')}
                margin="normal"
                value={cv.data.web ? cv.data.web : ''}
                onChange={this.handleChange('web')}
                fullWidth
                InputLabelProps={{ shrink: true }}
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
