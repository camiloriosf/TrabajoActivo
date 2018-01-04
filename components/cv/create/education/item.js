// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/es';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import {
  FormLabel,
  FormControlLabel,
} from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import { DatePicker } from 'material-ui-pickers';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
// component imports
import Header from './header';

moment.locale('es');

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
  date: {
    width: '100%',
  },
});

class Item extends Component {
  shouldComponentUpdate = (nextProps) => {
    if (this.props.index !== nextProps.index ||
    this.props.career !== nextProps.career ||
    this.props.university !== nextProps.university ||
    this.props.from !== nextProps.from ||
    this.props.to !== nextProps.to ||
    this.props.studying !== nextProps.studying ||
    this.props.description !== nextProps.description) return true;
    return false;
  }
  handleChange = name => (event) => {
    this.props.handleChange({ name, value: event.target.value, index: this.props.index });
  }
  handleDateChange = name => (date) => {
    this.props.handleChange({ name, value: date.format('DD-MM-YYYY'), index: this.props.index });
  }
  handleSwitchChange = name => (event, checked) => {
    this.props.handleChange({ name, value: checked, index: this.props.index });
  }
  render() {
    const {
      classes,
      t,
      index,
      career,
      university,
      from,
      to,
      studying,
      description,
      dragprops,
      handleEducationAdd,
      handleEducationDelete,
    } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel className={classes.paper}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Header
              index={index}
              dragprops={dragprops}
              handleEducationAdd={handleEducationAdd}
              handleEducationDelete={handleEducationDelete}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  id="career"
                  placeholder={t('create.sections.education.fields.career.placeholder')}
                  label={t('create.sections.education.fields.career.label')}
                  margin="normal"
                  value={career}
                  onChange={this.handleChange('career')}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="university"
                  placeholder={t('create.sections.education.fields.university.placeholder')}
                  label={t('create.sections.education.fields.university.label')}
                  margin="normal"
                  value={university}
                  onChange={this.handleChange('university')}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormLabel>
                  <Typography type="caption" component="p">
                    {t('create.sections.education.fields.from.label')}
                  </Typography>
                </FormLabel>
                <DatePicker
                  id="from"
                  className={classes.date}
                  value={moment(from, 'DD-MM-YYYY')}
                  disableFuture
                  openToYearSelection
                  autoOk
                  format="DD-MM-YYYY"
                  invalidLabel={t('create.sections.education.fields.from.placeholder')}
                  onChange={this.handleDateChange('from')}
                  leftArrowIcon={<KeyboardArrowLeftIcon />}
                  rightArrowIcon={<KeyboardArrowRightIcon />}
                />
              </Grid>
              {
                !studying && (
                  <Grid item xs={12} sm={4}>
                    <FormLabel>
                      <Typography type="caption" component="p">
                        {t('create.sections.education.fields.to.label')}
                      </Typography>
                    </FormLabel>
                    <DatePicker
                      id="to"
                      className={classes.date}
                      value={!studying ? moment(to, 'DD-MM-YYYY') : ''}
                      disableFuture
                      openToYearSelection
                      autoOk
                      disabled={studying}
                      format="DD-MM-YYYY"
                      invalidLabel={t('create.sections.education.fields.to.placeholder')}
                      onChange={this.handleDateChange('to')}
                      leftArrowIcon={<KeyboardArrowLeftIcon />}
                      rightArrowIcon={<KeyboardArrowRightIcon />}
                    />
                  </Grid>
                )
              }
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={studying}
                      onChange={this.handleSwitchChange('studying')}
                    />
                  }
                  label={t('create.sections.education.fields.studying.label')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  placeholder={t('create.sections.education.fields.description.placeholder')}
                  label={t('create.sections.education.fields.description.label')}
                  multiline
                  rows={7}
                  rowsMax={7}
                  margin="normal"
                  value={description}
                  onChange={this.handleChange('description')}
                  fullWidth
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number,
  career: PropTypes.string,
  university: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  studying: PropTypes.bool,
  description: PropTypes.string,
  dragprops: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEducationAdd: PropTypes.func.isRequired,
  handleEducationDelete: PropTypes.func.isRequired,
};

Item.defaultProps = {
  index: 0,
  career: '',
  university: '',
  from: '',
  to: '',
  studying: false,
  description: '',
};

export default translate('cv')(withStyles(styles)(Item));
