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
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
// component imports
import SectionHeader from '../sectionHeader';
import TipCard from '../tipCard';
import Item from './item';
import AddNew from './addNew';
// local imports
import {
  doReorderSectionItems,
  doSectionDBUpdate,
  doUpdateSectionDataArray,
  doAddNewCertificate,
  doDeleteSectionItem,
  doChangeSectionTitle,
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
  onSectionTitleEdit = ({ id }) => (event) => {
    this.props.doChangeSectionTitle({ id, value: event.target.value });
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
          title={cv.text !== '' ? cv.text : t('create.sections.certificates.title')}
          subtitle={t('create.sections.certificates.subtitle')}
          id={cv.id}
          editable
          handleTitleEdit={this.onSectionTitleEdit}
        >
          <div className={classes.content}>
            <Divider />
            <Grid container >
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.certificates.tips.title')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.certificates.tips.text')}
                </Typography>
                <TipCard text={t('create.sections.certificates.tips.tip1')} />
                <TipCard text={t('create.sections.certificates.tips.tip2')} />
                <TipCard text={t('create.sections.certificates.tips.tip3')} />
              </Grid>
            </Grid>
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
  doChangeSectionTitle: bindActionCreators(doChangeSectionTitle, dispatch),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(translate('cv')(withStyles(styles)(Index)));
