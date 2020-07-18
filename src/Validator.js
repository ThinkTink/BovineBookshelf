// Contains functions for validating input on the BookEditor component
const Validator = {
  title: function(title){
    let error, errorMessage;
    if(title === ''){
      error = true;
      errorMessage = 'Please enter a title.';
    }
    else if(title.length > 40){
      error = true;
      errorMessage = 'Please limit to 40 characters.';
    }
    else if(/[^a-zA-Z0-9 ']/.test(title)){
      error = true;
      errorMessage = 'Cannot contain special characters.';
    }
    else{
      error = false;
      errorMessage = '';
    }
    return [error, errorMessage];
  },

  author: function(author){
    let error, errorMessage;
    if(author === ''){
      error = true;
      errorMessage = 'Please enter an author.';
    }
    else if(author.length > 25){
      error = true;
      errorMessage = 'Please limit to 25 characters.';
    }
    else if(!/^([A-Za-z]+),\s([A-Za-z]+)$/.test(author)){
      error = true;
      errorMessage = 'Please enter as LastName, FirstName.';
    }
    else {
      error = false;
      errorMessage = '';
    }
    return [error, errorMessage];
  },

  length: function(length){
    let error, errorMessage;
    if(length > 0 && length < 10000){
      error =false;
      errorMessage = '';
    }
    else {
      error = true;
      errorMessage = 'Must be between 1 and 9999.';
    }
    return [error, errorMessage];
  },

  genre: function(genre){
    let error, errorMessage;
    if(genre === ''){
      error = true;
      errorMessage = 'Please select a genre.';
    }
    else {
      error = false;
      errorMessage = '';
    }
    return [error, errorMessage];
  },

  audience: function(audience){
    let error, errorMessage;
    if(audience === ''){
      error = true;
      errorMessage = 'Please select an audience.';
    }
    else {
      error = false;
      errorMessage = '';
    }
    return [error, errorMessage];
  }
};

export default Validator;
