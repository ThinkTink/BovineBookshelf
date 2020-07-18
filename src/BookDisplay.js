// Component to display books in the collection
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    width: '92%',
    margin: 'auto'
  },
  button: {
    marginRight: '10px'
  }
});

export default function BookDisplay(props) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">Author</TableCell>
            <TableCell align="left">Length</TableCell>
            <TableCell align="left">Genre</TableCell>
            <TableCell align="left">Audience</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.books.map((book) => (
            <TableRow key={book.id}>
              <TableCell component="th" scope="row"> {book.title} </TableCell>
              <TableCell align="left">{book.author}</TableCell>
              <TableCell align="left">{book.length}</TableCell>
              <TableCell align="left">{book.genre}</TableCell>
              <TableCell align="left">{book.audience}</TableCell>
              <TableCell align="left">
                <Button size="small" variant="outlined" onClick={props.editButtonAction.bind(this,book)} disabled={props.editStatus} className={classes.button}>Edit</Button>
                <Button size="small" variant="outlined" onClick={props.deleteButtonAction.bind(this,book)} disabled={props.editStatus}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};
