/* eslint-disable jsx-a11y/anchor-is-valid */

// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Link from 'next/link';
import { translate } from 'react-i18next';
import {
  SortingState, PagingState,
  LocalPaging, LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid, TableView, TableHeaderRow,
  // PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { TableCell } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
// component imports
import CellActionItem from './cellActionItem';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  row: {
    fontSize: 15,
    textAlign: 'left',
  },
  link: {
    textDecoration: 'none',
  },
});

class DataTable extends Component {
  state = {
    columns: [
      { name: 'name', title: this.props.t('table.columns.name') },
      { name: 'updatedAt', title: this.props.t('table.columns.updatedAt') },
      { name: 'visits', title: this.props.t('table.columns.visits'), width: 70 },
      { name: 'active', title: this.props.t('table.columns.active'), width: 70 },
      { name: 'options', title: this.props.t('table.columns.options'), width: 70 },
    ],
    sorting: [],
    currentPage: 0,
    pageSize: 0,
    // allowedPageSizes: [5, 10, 0],
  };

  changeSorting = sorting => this.setState({ sorting });
  changeCurrentPage = currentPage => this.setState({ currentPage });
  changePageSize = pageSize => this.setState({ pageSize });
  tableCellTemplate = ({ row, column }) => {
    if (column.name === 'options') {
      return (
        <TableCell>
          <CellActionItem
            id={row.id}
            handleCVCopy={this.props.handleCVCopy}
            handleCVDelete={this.props.handleCVDelete}
          />
        </TableCell>
      );
    }
    if (column.name === 'name') {
      return (
        <TableCell>
          <Link href={`/cv/create?id=${row.id}`} as={`/cv/create/${row.id}`}>
            <a className={this.props.classes.link}>
              <Typography type="caption" color="primary" className={this.props.classes.row}>
                {row[column.name]}
              </Typography>
            </a>
          </Link>
        </TableCell>
      );
    }
    if (column.name === 'active') {
      return (
        <TableCell>
          <Typography type="caption" color="primary">
            <Checkbox
              checked={row[column.name]}
              onChange={this.props.handleChange(row.id)}
            />
          </Typography>
        </TableCell>
      );
    }
    return (
      <TableCell>
        <Typography type="caption" className={this.props.classes.row}>
          {row[column.name]}
        </Typography>
      </TableCell>
    );
  };
  render() {
    const {
      columns,
      sorting,
      currentPage,
      pageSize,
      // allowedPageSizes,
    } = this.state;
    const {
      t,
    } = this.props;
    return (
      <Grid
        rows={this.props.data}
        columns={columns}
      >
        <SortingState
          sorting={sorting}
          onSortingChange={this.changeSorting}
        />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={this.changeCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={this.changePageSize}
        />
        <LocalSorting />
        <LocalPaging />
        <TableView tableCellTemplate={this.tableCellTemplate} />
        <TableHeaderRow
          allowSorting
          messages={{ sortingHint: t('table.sortingHint') }}
        />
        {/* <PagingPanel
          allowedPageSizes={allowedPageSizes}
          messages={{
            showAll: t('table.pagging.showAll'),
            rowsPerPage: t('table.pagging.rowsPerPage'),
            info: t('table.pagging.info'),
          }}
        /> */}
      </Grid>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCVCopy: PropTypes.func.isRequired,
  handleCVDelete: PropTypes.func.isRequired,
};

export default translate('cv')(withStyles(styles)(DataTable));

