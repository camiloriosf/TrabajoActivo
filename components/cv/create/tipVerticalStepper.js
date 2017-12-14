// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepButton, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  body: {
    textAlign: 'center',
  },
  actionsContainer: {
    marginTop: theme.spacing.unit * 3,
  },
});

class TipVerticalStepper extends Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState({
      activeStep:
        this.state.activeStep === this.props.children.length - 1 ? 0 : this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep:
        this.state.activeStep === 0 ? this.props.children.length - 1 : this.state.activeStep - 1,
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  render() {
    const {
      classes,
    } = this.props;
    const { activeStep } = this.state;
    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {this.props.children.map(({ title }, index) => (
            <Step key={title}>
              <StepButton onClick={this.handleStep(index)}>{title}</StepButton>
              <StepContent>
                <Typography>{this.props.children[activeStep].body}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Anterior
                    </Button>
                    <Button
                      raised
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }
}

TipVerticalStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array,
};

TipVerticalStepper.defaultProps = {
  children: [],
};

export default withStyles(styles)(TipVerticalStepper);
