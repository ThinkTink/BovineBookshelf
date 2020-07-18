// The main app component, contains primary state and routes to each page
import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import Home from './Home';
import Bookshelf from './Bookshelf';
import Add from './Add';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    minHeight: '95vh',
    [theme.breakpoints.down('md')]: {
      minHeight: '87vh'
    },
  },
  content: {
    paddingBottom: '1rem'
  }
}));

// Starting books if there is nothing in local storage yet
const defaultBooks = [
  { id: 1, title: "The Family Cow", author: "Van Loon, Dirk", length: 262, genre: "nonfiction", audience: "adults" },
  { id: 2, title: "The Cow: A Tribute", author: "Lampert, Werner", length: 479, genre: "nonfiction", audience: "adults" },
  { id: 3, title: "Cow Country", author: "Pearson, Adrian", length: 539, genre: "fiction", audience: "adults" },
  { id: 4, title: "Stop That Cow!", author: "Mackinnon, Mairi", length: 32, genre: "fiction", audience: "children" },
  { id: 5, title: "The Cow Loves Cookies", author: "Wilson, Karma", length: 15, genre: "fiction", audience: "children" },
  { id: 6, title: "Cows", author: "Nelson, Robin", length: 23, genre: "nonfiction", audience: "children" }
];

if (localStorage.getItem("books") === null) {
  localStorage.setItem("books", JSON.stringify(defaultBooks));
};

export default function App() {
  const classes = useStyles();
  
  const [selectedTab, setTab] = useState(0);
  const tabClick = (event, index) => {
    setTab(index);
  };

  const [books, setBooks] = useState([]);

  // Load from local storage on initial page load
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    setBooks(storedBooks);
  }, []);

  // Update local storage whenever books is updated
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const getNewBookId = () => {
    const maxId = books.reduce((maxId, current) => {
      return Math.max(maxId, current.id);
    }, 0);
    return maxId + 1;
  };

  const addBook = (book) => {
    const newBooks = books;
    newBooks.push(book);
    setBooks(newBooks);
  };

  const deleteBook = (bookToDelete) => {
    const newBooks = books.filter(book => book.id !== bookToDelete.id);
    setBooks(newBooks);
  };

  const editBook = (editedBook) => {
    const newBooks = books.map( book => { 
      if(book.id === editedBook.id){
        book.title = editedBook.title;
        book.author = editedBook.author;
        book.length = editedBook.length;
        book.genre = editedBook.genre;
        book.audience = editedBook.audience;
      };
      return book;
    });
    setBooks(newBooks);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>  
        <AppBar position="static" color="default">
          <Tabs
            variant="fullWidth"
            value={selectedTab}
            onChange={tabClick}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Home" component={Link} to="/BovineBookshelf"/>
            <Tab label="See the Books" component={Link} to="/BovineBookshelf/bookshelf"/>
            <Tab label="Add a Book" component={Link} to="/BovineBookshelf/add"/>
          </Tabs>
        </AppBar>

        <Switch>
          <Route exact path='/BovineBookshelf' component={Home}/>
          <Route path='/BovineBookshelf/bookshelf' render={(props) => (
            <Bookshelf {...props} books={books} deleteAction={deleteBook} editAction={editBook}/>
          )}/>
          <Route path='/BovineBookshelf/add' render={(props) => (
            <Add {...props} addAction={addBook} getNewBookId={getNewBookId}/>
          )}/>
        </Switch>

        <Footer/>
      </div>
    </div>
  )
};
