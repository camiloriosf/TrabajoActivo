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
    if (this.props.title !== nextProps.title ||
    this.props.from !== nextProps.from ||
    this.props.to !== nextProps.to ||
    this.props.noExpiration !== nextProps.noExpiration ||
    this.props.index !== nextProps.index) return true;
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
      title,
      from,
      to,
      noExpiration,
      index,
      dragprops,
      handleCertificateAdd,
      handleCertificateDelete,
    } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel className={classes.paper}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Header
              index={index}
              dragprops={dragprops}
              handleCertificateAdd={handleCertificateAdd}
              handleCertificateDelete={handleCertificateDelete}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <TextField
                  id="title"
                  placeholder={t('create.sections.certificates.fields.title.placeholder')}
                  label={t('create.sections.certificates.fields.title.label')}
                  margin="normal"
                  value={title}
                  onChange={this.handleChange('title')}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormLabel>
                  <Typography type="caption" component="p">
                    {t('create.sections.certificates.fields.from.label')}
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
                  invalidLabel={t('create.sections.certificates.fields.from.placeholder')}
                  onChange={this.handleDateChange('from')}
                  leftArrowIcon={<KeyboardArrowLeftIcon />}
                  rightArrowIcon={<KeyboardArrowRightIcon />}
                />
              </Grid>
              {
                !noExpiration && (
                  <Grid item xs={12} sm={4}>
                    <FormLabel>
                      <Typography type="caption" component="p">
                        {t('create.sections.certificates.fields.to.label')}
                      </Typography>
                    </FormLabel>
                    <DatePicker
                      id="to"
                      className={classes.date}
                      value={!noExpiration ? moment(to, 'DD-MM-YYYY') : ''}
                      openToYearSelection
                      autoOk
                      disabled={noExpiration}
                      format="DD-MM-YYYY"
                      invalidLabel={t('create.sections.certificates.fields.to.placeholder')}
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
                      checked={noExpiration}
                      onChange={this.handleSwitchChange('noExpiration')}
                    />
                  }
                  label={t('create.sections.certificates.fields.noExpiration.label')}
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
  title: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  noExpiration: PropTypes.bool,
  index: PropTypes.number,
  dragprops: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCertificateAdd: PropTypes.func.isRequired,
  handleCertificateDelete: PropTypes.func.isRequired,
};

Item.defaultProps = {
  title: '',
  from: '',
  to: '',
  noExpiration: false,
  index: 0,
};

export default translate('cv')(withStyles(styles)(Item));
