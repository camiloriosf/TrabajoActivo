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
  doAddNewCertificate,
  doDeleteSectionItem,
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
  onCertificateAdd = ({ index }) => () => {
    this.props.doAddNewCertificate({ index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onCertificateDelete = ({ index }) => () => {
    this.props.doDeleteSectionItem({ index });
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
          title={t('create.sections.certificates.title')}
          subtitle={t('create.sections.certificates.subtitle')}
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
                            title={item.title}
                            from={item.from}
                            to={item.to}
                            noExpiration={item.noExpiration}
                            dragprops={providedDraggabke.dragHandleProps}
                            handleChange={this.onInputChange}
                            handleCertificateAdd={this.onCertificateAdd}
                            handleCertificateDelete={this.onCertificateDelete}
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
          handleCertificateAdd={this.onCertificateAdd}
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
  doAddNewCertificate: bindActionCreators(doAddNewCertificate, dispatch),
  doDeleteSectionItem: bindActionCreators(doDeleteSectionItem, dispatch),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(translate('cv')(withStyles(styles)(Index)));
