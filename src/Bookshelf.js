// Page for displaying and editing books
import React, {useState} from 'react';
import { 
  Typography,
  makeStyles, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import BookDisplay from './BookDisplay';
import BookEditor from './BookEditor';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
    padding: '5px'
  },
  alert: {
    width: '90%',
    margin: 'auto',
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default function Bookshelf(props) {
  const classes = useStyles();
  const [editStatus, setEditStatus] = useState(false);
  const [bookToEdit, setBookToEdit] = useState([]);
  const [warningStatus, setWarningStatus] = useState(false);
  const [bookToDelete, setBookToDelete] = useState();
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState();

  const startEdit = (book) => {
    setEditStatus(true);
    setBookToEdit(book);
  };
  const clearEdit = () =>{
    setEditStatus(false);
  };
  const endEdit = (book) => {
    setEditStatus(false);
    props.editAction(book);
    setAlertStatus(true);
    setAlertMessage("Book was successfully edited!");
    setTimeout(() => setAlertStatus(false), 2000);
  };

  const openDeleteDialog = (book) => {
    setWarningStatus(true);
    setBookToDelete(book);
  };
  const closeDeleteDialog = () => {
    setWarningStatus(false);
  };
  const deleteBook = () => {
    setWarningStatus(false);
    props.deleteAction(bookToDelete);
    setAlertStatus(true);
    setAlertMessage("Book was successfully deleted!");
    setTimeout(() => setAlertStatus(false), 2000);
  };

  return (
    <div>
      <Typography variant='h2' className={classes.title}>Bookshelf</Typography>
      { alertStatus &&
        <Alert severity="success" className={classes.alert}>{alertMessage}</Alert>
      }
      { editStatus &&
        <BookEditor
          cardTitle="Make changes, then click save"
          book={bookToEdit}
          isEdit={true}
          cancelAction={clearEdit}
          cancelLabel="Cancel"
          formAction={endEdit}
          submitLabel="Save"
        />
      }
      <BookDisplay
        books={props.books}
        editButtonAction={startEdit}
        deleteButtonAction={openDeleteDialog}
        editStatus={editStatus}
      />
      <Dialog open={warningStatus} onClose={closeDeleteDialog}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>
            No
          </Button>
          <Button onClick={deleteBook} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};
