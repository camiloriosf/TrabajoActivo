// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import Button from 'material-ui/Button';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
  button: {
    textAlign: 'right',
    marginTop: theme.spacing.unit * 3,
  },
});

class SectionHeader extends Component {
  state = {
    open: false,
  }
  handleCollapse = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }
  render() {
    const {
      classes,
      title,
      subtitle,
      children,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={4}>
          <Typography type="headline" component="h3">
            {title}
          </Typography>
          <Typography type="body1" component="p">
            {subtitle}
          </Typography>
          <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
            {children}
          </Collapse>
          <div className={classes.button}>
            <Button raised color="primary" onClick={this.handleCollapse}>
              {
                this.state.open
                  ? t('create.sections.header.buttonHide')
                  : t('create.sections.header.buttonShow')
              }
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

SectionHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default translate('cv')(withStyles(styles)(SectionHeader));
