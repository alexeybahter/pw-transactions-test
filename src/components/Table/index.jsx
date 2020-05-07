import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  CircularProgress,
} from '@material-ui/core';

import { EnhancedTableHead, TablePaginationActions } from '../../ui';
import { getComparator, stableSort } from "../../utils";

import { useStyles } from './styles';

export const EnhancedTable = ({data, getDataRequest, headCells}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [tableData, setTableData] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [total, setTotal] = React.useState(0);
  const [emptyRows, setEmptyRows] = useState(0);

  useEffect(() => {
    if (data) {
      const {
        transactions,
        pagination: {
          page: currentPage,
          per_page,
          total: countAllItems
        }
      } = data;


      // Material UI first page is 0
      const firstPage = currentPage - 1;
      const fiveRows = 5;
      const lastPage = Math.ceil(countAllItems/rowsPerPage);

      setTableData(transactions);
      setPage(firstPage);
      setRowsPerPage(per_page);
      setTotal(countAllItems);

      if (lastPage !== currentPage) {
        if (countAllItems === 0) {
          setEmptyRows(5);
        } else {
          setEmptyRows(0)
        }
      } else if (lastPage === currentPage) {
        if (countAllItems % fiveRows || countAllItems === 0) {
          setEmptyRows(rowsPerPage-(countAllItems % rowsPerPage));
        } else {
          setEmptyRows( countAllItems % rowsPerPage);
        }
      }
    }
  },[ data, page ]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    const pageForServer = newPage + 1;

    const getData = async () => {
      await getDataRequest({
        page: pageForServer,
        perPage: rowsPerPage
      });
    };

    getData();

    setPage(newPage);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar className={classes.header}>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Transaction History
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <caption>The history of your transactions. Here you can see your transfers and transfers to you from other users.</caption>
            <EnhancedTableHead
              classes={classes}
              headCells={headCells}
              numSelected={0}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={0}
            />
            <TableBody>
              {!tableData ?
                (<TableRow
                    style={{ height: 265 }}>
                    <TableCell colSpan={12} align="center">
                      <CircularProgress className={classes.center}/>
                    </TableCell>
                  </TableRow>)
                :
                (stableSort(tableData, getComparator(order, orderBy))
                  .map(row => {
                    const labelId = `enhanced-table-checkbox-${row.id}`;

                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        >
                        <TableCell component="th" id={labelId} scope="row" align="left">
                         {row.sender.name}
                        </TableCell>
                        <TableCell align="left">{row.recipient.name}</TableCell>
                        <TableCell align="center">{row.count}</TableCell>
                        <TableCell align="center">{row.pw_count_resulted}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                      </TableRow>
                    )
                  })
                )
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} align="center">
                    {total === 0 && 'You have no history.' }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          ActionsComponent={TablePaginationActions}
          />
      </Paper>
    </div>
  );
};
