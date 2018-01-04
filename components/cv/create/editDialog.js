// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import List from 'material-ui/List';
// component imports
import DrawerMenuItem from './drawerMenuItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
});

const getItemStyle = (draggableStyle, isDragging) => ({
  background: isDragging ? 'rgba(0, 0, 0, 0.12)' : 'inherit',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#eeeeee' : 'inherit',
  // borderStyle: isDraggingOver ? 'dotted' : 'inherit',
});

class EditDialog extends Component {
  shouldComponentUpdate = (nextProps) => {
    if (this.props.items !== nextProps.items) return true;
    if (this.props.selected !== nextProps.selected) return true;
    if (this.props.open !== nextProps.open) return true;
    if (this.props.fullScreen !== nextProps.fullScreen) return true;
    return false;
  }
  render() {
    const {
      fullScreen,
      open,
      handleRequestClose,
      items,
      onDragEnd,
      handleItemHiddenClick,
      handleItemClick,
      selected,
    } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleRequestClose}
      >
        <DialogTitle>Secciones</DialogTitle>
        <DialogContent>
          <DragDropContext onDragEnd={onDragEnd}>
            <List>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {_.sortBy(items, ['order']).map(item => (
                      item.id === 'personal'
                        ? (
                          <DrawerMenuItem
                            key={item.id}
                            id={item.id}
                            text={item.text}
                            icon={item.icon}
                            hideButton={item.hideButton}
                            hidden={item.hidden}
                            dragButton={item.dragButton}
                            selected={selected === item.id}
                            handleClick={handleItemClick}
                            handleItemHiddenClick={handleItemHiddenClick}
                          />
                        ) : (
                          <Draggable key={item.id} draggableId={item.id}>
                            {(providedDraggabke, snapshotDraggable) => (
                              <div>
                                <div
                                  ref={providedDraggabke.innerRef}
                                  style={getItemStyle(
                                    providedDraggabke.draggableStyle,
                                    snapshotDraggable.isDragging,
                                  )}
                                >
                                  <DrawerMenuItem
                                    id={item.id}
                                    text={item.text}
                                    icon={item.icon}
                                    hideButton={item.hideButton}
                                    hidden={item.hidden}
                                    dragButton={item.dragButton}
                                    dragprops={providedDraggabke.dragHandleProps}
                                    selected={selected === item.id}
                                    handleClick={handleItemClick}
                                    handleItemHiddenClick={handleItemHiddenClick}
                                  />
                                </div>
                                {providedDraggabke.placeholder}
                              </div>
                            )}
                          </Draggable>
                        )
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </List>
          </DragDropContext>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool,
  items: PropTypes.array.isRequired,
  selected: PropTypes.string,
  onDragEnd: PropTypes.func.isRequired,
  handleItemHiddenClick: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

EditDialog.defaultProps = {
  selected: 'personal',
  open: false,
};

export default withMobileDialog()(translate('cv')(withStyles(styles)(EditDialog)));
