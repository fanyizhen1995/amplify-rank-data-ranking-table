import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.blue,
      color: theme.palette.common.black,
      fontSize: 20
    },
    body: {
      fontSize: 20,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

const useStyles = makeStyles({
    table: {
    minWidth: 700,
    },
});


export default function RankTable(props) {

    const ranks = props.ranks
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Typography component="div">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Rank</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Score</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {ranks.map((rank,index) => (
                                <StyledTableRow key={index}>
                                <StyledTableCell align="center">{index+1}</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {rank.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{rank.score}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Typography>
            </Container>
        </React.Fragment>
    )
}