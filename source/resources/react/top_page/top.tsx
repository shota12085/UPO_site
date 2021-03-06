import React, { Component } from 'react';
// import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles, makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import {jaJP} from '@material-ui/core/locale';
import axios from 'axios';

interface jsonType {
  data:string,
}
const url = '/api/get';

class Top extends React.Component <{}, { news: any }> {
  
  constructor(props){
    super(props);
    this.state = {news: []};
    this.articleNews(url);
  }

  async articleNews(URL){
    let return_Json:jsonType[] = [];

    axios
        .get<jsonType[]>(URL)
        .then((results) => {
            return_Json = results.data;
            this.setState({news: return_Json})
            // 成功したら取得できたデータを返す
            return return_Json;
        })
        .catch((error) => {
            console.log('通信失敗');
            console.log(error.status);
            // 失敗したときは空のjsonを返す
        });
  }
  
  render(){
    if (this.state.news.length > 0) {
        return (
          <React.Fragment>
              <NewsDataTable news = {this.state.news}/>
          </React.Fragment>
        );
    }
    return <div>Loading...</div>;
  }

}

const theme = createMuiTheme({}, jaJP);

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  // const handleFirstPageButtonClick = (event) => {
  //   onChangePage(event, 0);
  // };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  // const handleLastPageButtonClick = (event) => {
  //   onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  // };

  return (
    <div className={classes.root}>
      {/* <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton> */}
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      {/* <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton> */}
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 400,
  },
});
const StyledTableCell = withStyles((theme) => ({
  // head: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  // },
  body: {
    fontSize: 14,
    padding: '20px',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
export default function NewsDataTable(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.news.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
           <StyledTableRow>
             <StyledTableCell>日付</StyledTableCell>
             <StyledTableCell align="left">お知らせ</StyledTableCell>
           </StyledTableRow>
         </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? props.news.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.news
          ).map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row" style={{ minWidth: 100 }} align="left">
                {row.created_at}
              </StyledTableCell>
              <StyledTableCell style={{ minWidth: 300 }} align="left">
                {row.title}
              </StyledTableCell>
            </StyledTableRow>
          ))}

          {/* {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={3} />
            </StyledTableRow>
          )} */}
        </TableBody>
        <TableFooter>
          <StyledTableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              colSpan={3}
              count={props.news.length}
              rowsPerPage={rowsPerPage}
              page={page}
              // SelectProps={{
              //   inputProps: { 'aria-label': '表示件数' },
              //   native: false,
              // }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </StyledTableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </ThemeProvider>
  );
}

if (document.getElementById('news')) {
  ReactDOM.render(<Top />, document.getElementById('news'));
}
