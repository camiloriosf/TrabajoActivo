// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import _ from 'lodash';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
});

class Example extends Component {
  render() {
    const {
      classes,
      position,
      company,
      dates,
      responsibility,
      responsibilities,
      achievement,
      achievements,
    } = this.props;
    return (
      <div className={classes.root}>
        <Grid container >
          <Grid item xs={6} >
            <Typography type="body2" color="secondary">
              <strong>{position}</strong> {company}
            </Typography>
          </Grid>
          <Grid item xs={6} >
            <Typography type="body2" color="secondary" style={{ textAlign: 'right' }}>
              {dates}
            </Typography>
          </Grid>
          {
            responsibilities !== '' && (
              <Grid item xs={12} >
                <Typography type="body2" color="secondary">
                  {responsibility}
                </Typography>
                {
                  _.split(responsibilities, '/').map(item => (
                    <Typography type="body2" color="secondary" key={item}>
                      {item}
                    </Typography>
                  ))
                }
              </Grid>
            )
          }
          {
            achievements !== '' && (
              <Grid item xs={12} >
                <Typography type="body2" color="secondary">
                  {achievement}
                </Typography>
                {
                  _.split(achievements, '/').map(item => (
                    <Typography type="body2" color="secondary" key={item}>
                      {item}
                    </Typography>
                  ))
                }
              </Grid>
            )
          }
        </Grid>
      </div>
    );
  }
}

Example.propTypes = {
  classes: PropTypes.object.isRequired,
  position: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  dates: PropTypes.string.isRequired,
  responsibility: PropTypes.string.isRequired,
  responsibilities: PropTypes.string.isRequired,
  achievement: PropTypes.string.isRequired,
  achievements: PropTypes.string.isRequired,
};

export default withStyles(styles)(Example);
