import React, { Component } from 'react';
import './App.css';

import BookItem from './BookItem';
import AddBook from './AddBook';
//import {fetchBooks, requestApiKey} from './api.js';

const books = [
  {
    title: 'something title',
    author: 'someone wrote this'
  },
  {
    title: 'some other title',
    author: 'some other author'
  }
];

const apiKey = localStorage.getItem('firstKey');

const getFirstKey = () => {
  console.log('blurp', apiKey);
  if (apiKey) {
    return apiKey
  } else {
    fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?requestKey`)
      .then(response => response.json())
      .then(data => localStorage.setItem('firstKey', data.key))
  }
};

localStorage.setItem('books', JSON.stringify(books));

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: JSON.parse(localStorage.getItem('books'), 'title')
    };
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }
  componentWillMount() {
    this.getBooks();
    this.setState({ books });
  }

  componentDidMount() {

    getFirstKey();
    console.log(localStorage.getItem('firstKey'));
  }

  getBooks() {
    return this.state.books;
  }

  onAdd(title, author) {
    const books = this.getBooks();

    /*books.push({
      title,
      author
    });*/

    fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=${apiKey}&title=${title}&author=${author}`)
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          this.onAdd(title, author);
          this.setState({ books });
        } else {
          console.log('something went poopy');
        }
      })
  }

  onDelete(title) {
    const books = this.getBooks();
    const filteredBooks = books.filter(book => {
      return book.title !== title;
    });
    this.setState({ books: filteredBooks });
  }

  onEditSubmit(title, author, originalTitle) {
    let books = this.getBooks();
    books = books.map(book => {
      if (book.title === originalTitle) {
        book.title = title;
        book.author = author;
      }
      return book;
    });
    this.setState({ books });
  }

  render() {
    return (
      <div className="App">
        <h1>Book Manager</h1>
        <AddBook
          onAdd={this.onAdd}
        />
        {this.state.books.map(book => {
          return (
            <BookItem
              key={book.title}
              {...book}
              onDelete={this.onDelete}
              onEditSubmit={this.onEditSubmit}
            />
          );
        })
        }
      </div>
    );
  }
}

export default App;
