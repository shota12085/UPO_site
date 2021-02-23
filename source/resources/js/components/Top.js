// import React, { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

class Top extends React.Component {
  constructor(){
    super();
    this.state = {
      news: [],
    };
  }

  componentDidMount(){
    $.ajax({
      type: "GET",
      url: '/api/get'
    })
    .then((res) => {
        this.setState({
            news: res
        });
    })
    .catch(error => {
        console.log(error)
    })
  }
  render(){
    return (
      <React.Fragment>
          <CustomizedTables news={this.state.news}/>
      </React.Fragment>
    );
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

ReactDOM.render(<Top />, document.getElementById('news'));
