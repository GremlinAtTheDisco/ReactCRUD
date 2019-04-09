import React, { Component } from 'react';
import './App.css';

import BookItem from './BookItem';
import AddBook from './AddBook';

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

localStorage.setItem('books', JSON.stringify(books));

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: JSON.parse(localStorage.getItem('books'))
    };
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }
  componentWillMount() {
    this.getBooks();
    this.setState({ books });
  }

  getBooks() {
    return this.state.books;
  }

  onAdd(title, author) {
    const books = this.getBooks();

    books.push({
      title,
      author
    });
    this.setState({ books });
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
