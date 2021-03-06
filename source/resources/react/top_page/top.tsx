import React, { Component } from 'react';
// import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
// import { NewReleasesSharp } from '@material-ui/icons';
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
              <CustomizedTables news = {this.state.news}/>
          </React.Fragment>
        );
    }
    return <div>Loading...</div>;
  }

}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  // container: {
  //   maxHeight: 400,
  // },
});

function CustomizedTables(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (props.news.length > 0){
    return (
      // <Paper className={classes.root}>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>日付</StyledTableCell>
            <StyledTableCell align="left">お知らせ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.news.map((prop) => (
            <StyledTableRow key={prop.id}>
              <StyledTableCell component="th" scope="row">{prop.created_at}</StyledTableCell>
              <StyledTableCell align="left">{prop.title}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        colSpan={3}
        component='div'
        count={props.news.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </TableContainer>
    // </Paper>
    );
  } else {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>日付</StyledTableCell>
              <StyledTableCell align="left">お知らせ</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    ) 
  }
}
if (document.getElementById('news')) {
  ReactDOM.render(<Top />, document.getElementById('news'));
}
