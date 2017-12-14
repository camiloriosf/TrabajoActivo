// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    display: 'flex',
  },
  flex: {
    flex: 1,
  },
  button: {
    width: 30,
    height: 30,
  },
});

class ListItem extends Component {
  handleKeyPress = (event) => {
    const {
      companyIndex,
      index,
    } = this.props;
    if (event.keyCode === 13) this.props.handleAddClick({ companyIndex, index });
  }
  render() {
    const {
      classes,
      companyIndex,
      index,
      text,
      type,
      handleChange,
      handleAddClick,
      handleDeleteClick,
      handleKeyPress,
    } = this.props;
    return (
      <div className={classes.root}>
        <TextField
          id="responsibility"
          className={classes.flex}
          margin="normal"
          value={text}
          onChange={handleChange({ type, companyIndex, index })}
          onKeyDown={handleKeyPress({ type, companyIndex, index })}
        />
        <IconButton
          className={classes.button}
          color="primary"
          aria-label="Add"
          onClick={handleAddClick({ type, companyIndex, index })}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          className={classes.button}
          color="accent"
          aria-label="Delete"
          onClick={handleDeleteClick({ type, companyIndex, index })}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  companyIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};

export default withStyles(styles)(ListItem);
