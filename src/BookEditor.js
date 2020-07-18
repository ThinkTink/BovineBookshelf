// Box showing book details for adding or editing a book
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';
import Validator from './Validator';

const useStyles = makeStyles({
  pageTitle: {
    textAlign: 'center',
    padding: '5px'
  },
  card: {
    width: '92%',
    margin: 'auto',
    marginBottom: 25
  },
  cardTitle: {
    marginBottom: 10
  },
  formInput: {
    minWidth: 120,
    paddingRight: 25,
    paddingBottom: 3
  },
  formInputTitle: {
    minWidth: 275,
    paddingRight: 25,
    paddingBottom: 3
  },
  button: {
    marginBottom: 10,
    marginRight: 10,
    float: 'right'
  }
});

export default function BookEditor(props) {
  // includes a default prop of an empty book for use when adding a new book
  const { book = {id: "", title: "", author: "", length: "", genre: "", audience: "" }, cardTitle, isEdit, getNewBookId, formAction, submitLabel, cancelAction, cancelLabel} = props;
  const classes = useStyles();

  const [title, setTitle] = useState(book.title);
  const [titleError, setTitleError] = useState(false);
  const [titleHelperText, setTitleHelperText] = useState('');

  const [author, setAuthor] = useState(book.author);
  const [authorError, setAuthorError] = useState(false);
  const [authorHelperText, setAuthorHelperText] = useState('');

  const [length, setLength] = useState(book.length);
  const [lengthError, setLengthError] = useState(false);
  const [lengthHelperText, setLengthHelperText] = useState('');

  const [genre, setGenre] = useState(book.genre);
  const [genreError, setGenreError] = useState(false);
  const [genreHelperText, setGenreHelperText] = useState('');

  const [audience, setAudience] = useState(book.audience);
  const [audienceError, setAudienceError] = useState(false);
  const [audienceHelperText, setAudienceHelperText] = useState('');

  // Can only submit form if all fields are filled in
  let formIncomplete = (title.length === 0) || (author.length === 0) || (genre.length === 0) || (length.length === 0) || (audience.length === 0);
  // and there are no errors
  let buttonDisable = formIncomplete || titleError || authorError || lengthError || genreError || audienceError;

  const titleChange = (event) => {
    setTitle(event.target.value);    
  };
  const validateTitle = (event) => {
    setTitle(event.target.value.trim()); // Only trim extra white space on blur
    const [error, errorMessage] = Validator.title(title);
    setTitleError(error);
    setTitleHelperText(errorMessage);
  };

  const authorChange = (event) => {
    setAuthor(event.target.value);
  };
  const validateAuthor = (event) => {
    setAuthor(event.target.value.trim());
    const [error, errorMessage] = Validator.author(author);
    setAuthorError(error);
    setAuthorHelperText(errorMessage);
  };

  const lengthChange = (event) => {
    setLength(parseInt(event.target.value, 10));
  };
  const validateLength = () => {
    const [error, errorMessage] = Validator.length(length);
    setLengthError(error);
    setLengthHelperText(errorMessage);
  };

  const genreChange = (event) => {
    setGenre(event.target.value);
  };
  const validateGenre = () => {
    const [error, errorMessage] = Validator.genre(genre);
    setGenreError(error);
    setGenreHelperText(errorMessage);
  };

  const audienceChange = (event) => {
    setAudience(event.target.value);
  };
  const validateAudience = () => {
    const [error, errorMessage] = Validator.audience(audience);
    setAudienceError(error);
    setAudienceHelperText(errorMessage);
  };

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setLength("");
    setGenre("");
    setAudience("");
  };

  const formSubmit = (event) =>{
    event.preventDefault();
    let newBook;
    if(isEdit){
      newBook = { id: book.id, title, author, length, genre, audience };
    }
    else {
      const id = getNewBookId();
      newBook = { id, title, author, length, genre, audience };
      clearForm();
    }
    formAction(newBook);
  };

  let cancelButtonAction;
  if(isEdit) cancelButtonAction = cancelAction;
  else cancelButtonAction = clearForm;

  return (
    <div>    
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography variant='h5' className={classes.cardTitle}>{cardTitle}</Typography>
          <form>
            <TextField
              label="Title"
              required
              value={title}
              onChange={titleChange}
              className={classes.formInputTitle}
              error={titleError}
              helperText={titleHelperText}
              onBlur={validateTitle}
            />
            <TextField
              label="Author (Last, First)"
              required
              value={author}
              onChange={authorChange}
              className={classes.formInput}
              error={authorError}
              helperText={authorHelperText}
              onBlur={validateAuthor}
              />
            <TextField
              label="Length in pages"
              required
              value={length}
              onChange={lengthChange}
              className={classes.formInput}
              error={lengthError}
              helperText={lengthHelperText}
              onBlur={validateLength}
            />

            <FormControl
              required
              className={classes.formInput}
              error={genreError}
              onBlur={validateGenre} 
            >
              <InputLabel>Genre</InputLabel>
              <Select value={genre} onChange={genreChange}>
                <MenuItem value={'fiction'}>fiction</MenuItem>
                <MenuItem value={'nonfiction'}>nonfiction</MenuItem>
              </Select>
              <FormHelperText>{genreHelperText}</FormHelperText>
            </FormControl>
            
            <FormControl
              required
              className={classes.formInput}
              error={audienceError}
              onBlur={validateAudience} 
            >
              <InputLabel>Audience</InputLabel>
              <Select value={audience} onChange={audienceChange}>
                <MenuItem value={'adults'}>adults</MenuItem>
                <MenuItem value={'children'}>children</MenuItem>
              </Select>
              <FormHelperText>{audienceHelperText}</FormHelperText>
            </FormControl>
          </form>
          <br></br>
          <Button
            onClick={formSubmit}
            className={classes.button}
            disabled={buttonDisable}
            variant="contained"
            color="primary"
          > {submitLabel} </Button>
          <Button
            onClick={cancelButtonAction}
            className={classes.button}
            variant="contained"
            color="secondary"
          > {cancelLabel} </Button>
        </CardContent>
      </Card>
    </div>
  )
};
