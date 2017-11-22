/* eslint-disable jsx-a11y/anchor-is-valid */

// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  SortingState, PagingState,
  LocalPaging, LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid, TableView, TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { TableCell } from 'material-ui/Table';
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
    rows: [
      {
        id: 1,
        name: 'CV Base',
        updatedAt: '21 nov. 2017',
        visits: 10,
        active: 'Sí',
      },
      {
        id: 2,
        name: 'ABB',
        updatedAt: '22 nov. 2017',
        visits: 2,
        active: 'Sí',
      },
    ],
    columns: [
      { name: 'name', title: this.props.table.columns.name },
      { name: 'updatedAt', title: this.props.table.columns.updatedAt },
      { name: 'visits', title: this.props.table.columns.visits, width: 70 },
      { name: 'active', title: this.props.table.columns.active, width: 70 },
      { name: 'options', title: ' ', width: 70 },
    ],
    sorting: [],
    currentPage: 0,
    pageSize: 0,
    allowedPageSizes: [5, 10, 0],
  };

  onClick = ({ id, action }) => {
    console.log(id, action);
  }

  changeSorting = sorting => this.setState({ sorting });
  changeCurrentPage = currentPage => this.setState({ currentPage });
  changePageSize = pageSize => this.setState({ pageSize });
  tableCellTemplate = ({ row, column }) => {
    if (column.name === 'options') {
      return (
        <TableCell>
          <CellActionItem id={row.id} handleClick={this.onClick} actionItem={this.props.table.actionItem} />
        </TableCell>
      );
    }
    if (column.name === 'name') {
      return (
        <TableCell>
          <Link href={`/user/cv/edit/${row.id}`}>
            <a className={this.props.classes.link}>
              <Typography type="caption" color="primary" className={this.props.classes.row}>
                {row[column.name]}
              </Typography>
            </a>
          </Link>
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
      rows,
      columns,
      sorting,
      currentPage,
      pageSize,
      allowedPageSizes,
    } = this.state;
    const {
      table,
    } = this.props;
    return (
      <Grid
        rows={rows}
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
          messages={{ sortingHint: table.sortingHint }}
        />
        <PagingPanel
          allowedPageSizes={allowedPageSizes}
          messages={{
            showAll: table.pagging.showAll,
            rowsPerPage: table.pagging.rowsPerPage,
            info: table.pagging.info,
          }}
        />
      </Grid>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  table: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataTable);
