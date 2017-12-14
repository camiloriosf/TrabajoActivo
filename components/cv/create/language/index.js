// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import _ from 'lodash';
import { translate } from 'react-i18next';
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
  doSectionDBUpdate,
  doUpdateSectionDataArray,
  doReorderSectionItems,
  doAddNewLanguage,
  doDeleteSectionItem,
} from '../../../../lib/redux/actions/cv';
import { makeGetSectionDataState } from '../../../../lib/reselect/cv';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  content: {
    marginTop: theme.spacing.unit * 3,
  },
  tipTitle: {
    marginTop: theme.spacing.unit * 3,
  },
  tipSubtitle: {
    marginTop: theme.spacing.unit,
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
  onInputChange = ({ name, index }) => (event) => {
    this.props.doUpdateSectionDataArray({
      name, value: event.target.value, index,
    });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onLanguageAdd = ({ index }) => () => {
    this.props.doAddNewLanguage({ index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onLanguageDelete = ({ index }) => () => {
    this.props.doDeleteSectionItem({ index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onStarChange = ({ name, value, index }) => {
    this.props.doUpdateSectionDataArray({ name, value, index });
    this.delayedSaving({ selected: this.props.cv.id });
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
          title={t('create.sections.language.title')}
          subtitle={t('create.sections.language.subtitle')}
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
                    {(providedDraggable, snapshotDraggable) => (
                      <div>
                        <div
                          ref={providedDraggable.innerRef}
                          style={getItemStyle(
                                      providedDraggable.draggableStyle,
                                      snapshotDraggable.isDragging,
                                    )}
                        >
                          <Item
                            index={item.index}
                            language={item.language}
                            description={item.description}
                            stars={item.stars}
                            dragprops={providedDraggable.dragHandleProps}
                            handleChange={this.onInputChange}
                            handleLanguageAdd={this.onLanguageAdd}
                            handleLanguageDelete={this.onLanguageDelete}
                            handleStarChange={this.onStarChange}
                          />
                        </div>
                        {providedDraggable.placeholder}
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
          handleLanguageAdd={this.onLanguageAdd}
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
  doSectionDBUpdate: bindActionCreators(doSectionDBUpdate, dispatch),
  doReorderSectionItems: bindActionCreators(doReorderSectionItems, dispatch),
  doUpdateSectionDataArray: bindActionCreators(doUpdateSectionDataArray, dispatch),
  doAddNewLanguage: bindActionCreators(doAddNewLanguage, dispatch),
  doDeleteSectionItem: bindActionCreators(doDeleteSectionItem, dispatch),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(translate('cv')(withStyles(styles)(Index)));
