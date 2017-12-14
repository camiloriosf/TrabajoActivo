// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import List, {
  ListSubheader,
} from 'material-ui/List';
// component imports
import DrawerMenuItem from './drawerMenuItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    flex: '0 0 300px',
  },
  drawerPaper: {
    width: 300,
    boxShadow: '5px 0 10px -5px #888',
    boxShadowColor: theme.palette.common.white,
    WebkitOverflowScrolling: 'touch',
    minHeight: '100%',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerInner: {
    width: '100%',
    minHeight: 'calc(100vh - 65px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
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

class EditDrawer extends Component {
  shouldComponentUpdate = (nextProps) => {
    if (this.props.items !== nextProps.items) return true;
    if (this.props.selected !== nextProps.selected) return true;
    return false;
  }

  render() {
    const {
      classes,
      items,
      onDragEnd,
      handleItemHiddenClick,
      handleItemClick,
      selected,
    } = this.props;
    return (
      <div
        className={classes.root}
      >
        <div
          className={classes.drawerPaper}
        >
          <div className={classes.drawerInner}>
            <DragDropContext onDragEnd={onDragEnd}>
              <List subheader={<ListSubheader>{this.props.t('create.sections.title')}</ListSubheader>}>
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
          </div>
        </div >
      </div>
    );
  }
}

EditDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.string,
  onDragEnd: PropTypes.func.isRequired,
  handleItemHiddenClick: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
};

EditDrawer.defaultProps = {
  selected: 'personal',
};

export default translate('cv')(withStyles(styles)(EditDrawer));
