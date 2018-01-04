// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  body: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 0,
    background: theme.palette.common.faintBlack,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 50,
    padding: theme.spacing.unit * 4,
    marginBottom: 0,
    background: theme.palette.common.lightWhite,
  },
  stepper: {
    background: theme.palette.common.faintBlack,
  },
});

class ExamplesStepper extends Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };
  render() {
    const {
      classes,
      items,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.body}>
          <Paper square elevation={0} className={classes.header}>
            <Typography type="body2">{items.length} Ejemplos</Typography>
          </Paper>
          <Paper square elevation={0} className={classes.content}>
            {items[this.state.activeStep]}
          </Paper>
          <MobileStepper
            type="progress"
            steps={items.length}
            position="static"
            activeStep={this.state.activeStep}
            className={classes.stepper}
            nextButton={
              <Button
                dense
                onClick={this.handleNext}
                disabled={this.state.activeStep === items.length - 1 || items.length === 0}
              >
                {t('create.examplesStepper.next')}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button dense onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                <KeyboardArrowLeft />
                {t('create.examplesStepper.back')}
              </Button>
            }
          />
        </div>
      </div>
    );
  }
}

ExamplesStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array,
};

ExamplesStepper.defaultProps = {
  items: [],
};

export default translate('cv')(withStyles(styles)(ExamplesStepper));
