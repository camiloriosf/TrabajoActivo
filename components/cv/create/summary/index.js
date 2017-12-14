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
import TipVerticalStepper from '../tipVerticalStepper';
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
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <SectionHeader
          title={t('create.sections.summary.title')}
          subtitle={t('create.sections.summary.subtitle')}
        >
          <div className={classes.content}>
            <Divider />
            <Grid container >
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.summary.tips.0.title')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.summary.tips.0.body')}
                </Typography>
                <TipCard text={t('create.sections.summary.tips.0.tipRight')} />
              </Grid>
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.summary.tips.1.title')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.summary.tips.1.body')}
                </Typography>
                <TipCard text={t('create.sections.summary.tips.1.tipRight')} />
              </Grid>
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.summary.tips.2.title')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.summary.tips.2.body')}
                </Typography>
                <TipCard text={t('create.sections.summary.tips.2.tipRight')} />
              </Grid>
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.summary.examples.title')}
                </Typography>
                <TipVerticalStepper>
                  {[
                    {
                      title: t('create.sections.summary.examples.fields.0.title'),
                      body: t('create.sections.summary.examples.fields.0.body'),
                    },
                    {
                      title: t('create.sections.summary.examples.fields.1.title'),
                      body: t('create.sections.summary.examples.fields.1.body'),
                    },
                    {
                      title: t('create.sections.summary.examples.fields.2.title'),
                      body: t('create.sections.summary.examples.fields.2.body'),
                    },
                    {
                      title: t('create.sections.summary.examples.fields.3.title'),
                      body: t('create.sections.summary.examples.fields.3.body'),
                    },
                    {
                      title: t('create.sections.summary.examples.fields.4.title'),
                      body: t('create.sections.summary.examples.fields.4.body'),
                    },
                  ]}
                </TipVerticalStepper>
              </Grid>
            </Grid>
          </div>
        </SectionHeader>
        <Paper elevation={4} className={classes.paper}>
          <Grid container >
            <Grid item xs={12}>
              <TextField
                id="summary"
                placeholder={t('create.sections.summary.fields.summary.placeholder')}
                label={t('create.sections.summary.fields.summary.label')}
                multiline
                rows={7}
                rowsMax={7}
                margin="normal"
                value={this.props.cv.data.summary}
                onChange={this.handleChange('summary')}
                fullWidth
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
