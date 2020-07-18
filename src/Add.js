// Page for adding a new book to the collection
import React, { useState } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import BookEditor from './BookEditor';

const useStyles = makeStyles({
  pageTitle: {
    textAlign: 'center',
    padding: '5px'
  },
  alert: {
    width: '90.5%',
    margin: 'auto',
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default function Add(props) {
  const classes = useStyles();
  const [alertStatus, setAlertStatus] = useState(false);

  const addBook = (book) => {
    props.addAction(book);
    setAlertStatus(true);
    setTimeout(() => setAlertStatus(false), 2000);
  };

  return (
    <div>
      <Typography variant='h2' className={classes.pageTitle}>Add a Book</Typography>
      { alertStatus &&
        <Alert severity="success" className={classes.alert}>Book was successfully added!</Alert>
      }
      <BookEditor
        cardTitle="Know a book that belongs on the Bovine Bookshelf? Enter its details and click Submit to add it:"
        isEdit={false}
        getNewBookId={props.getNewBookId}
        cancelLabel="Clear"
        submitLabel="Submit"
        formAction={addBook}
      />
    </div>
  )
};
