// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import DoneIcon from 'material-ui-icons/Done';
import ClearIcon from 'material-ui-icons/Clear';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  card: {
    display: 'flex',
    backgroundColor: theme.palette.common.faintBlack,
    margin: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      margin: theme.spacing.unit,
    },
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
  },
  typo: {
    wordWrap: 'break-word',
  },
  icons: {
    flex: '0 0 60px',
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    color: green[500],
  },
  iconClear: {
    width: 50,
    height: 50,
    color: red[500],
  },
});

class TipCard extends Component {
  render() {
    const {
      classes,
      text,
      wrong,
    } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography type="subheading" color="secondary" className={classes.typo}>
              {text}
            </Typography>
          </CardContent>
          <div className={classes.icons}>
            {
              !wrong
                ? <DoneIcon className={classes.icon} />
                : <ClearIcon className={classes.iconClear} />
            }
          </div>
        </Card>
      </div>
    );
  }
}

TipCard.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  wrong: PropTypes.bool,
};

TipCard.defaultProps = {
  wrong: false,
};

export default withStyles(styles)(TipCard);
