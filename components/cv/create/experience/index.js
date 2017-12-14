// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// material-ui imports
import { withStyles } from 'material-ui/styles';
// component imports
import SectionHeader from '../sectionHeader';
import Item from './item';
import AddNew from './addNew';
// local imports
import {
  doReorderSectionItems,
  doSectionDBUpdate,
  doUpdateSectionDataArray,
  doAddNewExperience,
  doDeleteSectionItem,
  doUpdateExperienceListItem,
  doAddExperienceListItem,
  doDeleteExperienceListItem,
} from '../../../../lib/redux/actions/cv';
import { makeGetSectionDataState } from '../../../../lib/reselect/cv';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  content: {
    marginTop: theme.spacing.unit * 3,
  },
});

const getItemStyle = (draggableStyle, isDragging) => ({
  background: isDragging ? 'rgba(0, 0, 0, 0.12)' : 'inherit',
  ...draggableStyle,
});

class Index extends Component {
  componentDidMount = () => {
    this.delayedSaving = _.debounce(this.props.doSectionDBUpdate, 2000);
  }
  onDragEnd = (result) => {
    this.props.doReorderSectionItems(result);
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onInputChange = ({ name, value, index }) => {
    this.props.doUpdateSectionDataArray({ name, value, index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onExperienceAdd = ({ index }) => () => {
    this.props.doAddNewExperience({ index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onExperienceDelete = ({ index }) => () => {
    this.props.doDeleteSectionItem({ index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onListItemChange = ({ type, companyIndex, index }) => (event) => {
    this.props.doUpdateExperienceListItem({
      type, companyIndex, index, value: event.target.value,
    });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onListItemAdd = ({ type, companyIndex, index }) => () => {
    this.props.doAddExperienceListItem({ type, companyIndex, index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onListItemDelete = ({ type, companyIndex, index }) => () => {
    this.props.doDeleteExperienceListItem({ type, companyIndex, index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onListItemKeyPress = ({ type, companyIndex, index }) => (event) => {
    if (event.keyCode === 13) {
      this.props.doAddExperienceListItem({ type, companyIndex, index });
      this.delayedSaving({ selected: this.props.cv.id });
    }
  }
  render() {
    const {
      classes,
      t,
      cv,
    } = this.props;
    return (
      <div className={classes.root}>
        <SectionHeader
          title={t('create.sections.experience.title')}
          subtitle={t('create.sections.experience.subtitle')}
        >
          <div className={classes.content}>
          a
          </div>
        </SectionHeader>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                ref={provided.innerRef}
              >
                {_.sortBy(cv.data, ['index']).map(item => (
                  <Draggable key={item.index} draggableId={item.index}>
                    {(providedDraggabke, snapshotDraggable) => (
                      <div>
                        <div
                          ref={providedDraggabke.innerRef}
                          style={getItemStyle(
                                      providedDraggabke.draggableStyle,
                                      snapshotDraggable.isDragging,
                                    )}
                        >
                          <Item
                            index={item.index}
                            role={item.role}
                            company={item.company}
                            from={item.from}
                            to={item.to}
                            actual={item.actual}
                            responsibilities={item.responsibilities}
                            achievements={item.achievements}
                            description={item.description}
                            dragprops={providedDraggabke.dragHandleProps}
                            handleChange={this.onInputChange}
                            handleExperienceAdd={this.onExperienceAdd}
                            handleExperienceDelete={this.onExperienceDelete}
                            handleListItemChange={this.onListItemChange}
                            handleListItemAdd={this.onListItemAdd}
                            handleListItemDelete={this.onListItemDelete}
                            handleListItemKeyPress={this.onListItemKeyPress}
                          />
                        </div>
                        {providedDraggabke.placeholder}
                      </div>
                              )}
                  </Draggable>
                          ))}
                {provided.placeholder}
              </div>
                  )}
          </Droppable>
        </DragDropContext>
        <AddNew
          index={cv.data.length}
          handleExperienceAdd={this.onExperienceAdd}
        />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const makeMapStateToProps = () => {
  const getDataState = makeGetSectionDataState();
  return (state, props) => getDataState(state, props);
};

const mapDispatchToProps = dispatch => ({
  doReorderSectionItems: bindActionCreators(doReorderSectionItems, dispatch),
  doSectionDBUpdate: bindActionCreators(doSectionDBUpdate, dispatch),
  doUpdateSectionDataArray: bindActionCreators(doUpdateSectionDataArray, dispatch),
  doAddNewExperience: bindActionCreators(doAddNewExperience, dispatch),
  doDeleteSectionItem: bindActionCreators(doDeleteSectionItem, dispatch),
  doUpdateExperienceListItem: bindActionCreators(doUpdateExperienceListItem, dispatch),
  doAddExperienceListItem: bindActionCreators(doAddExperienceListItem, dispatch),
  doDeleteExperienceListItem: bindActionCreators(doDeleteExperienceListItem, dispatch),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(translate('cv')(withStyles(styles)(Index)));
