import React, { Component } from 'react';
import './App.css';


class AddBook extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onAdd(this.titleInput.value, this.authorInput.value);

        this.titleInput.value = "";
        this.authorInput.value = "";
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Add book</h3>
                <input
                    placeholder="Title"
                    ref={titleInput => this.titleInput = titleInput} />
                <input
                    placeholder="Author"
                    ref={authorInput => this.authorInput = authorInput} />
                <button>Submit</button>
                <hr />
            </form>
        );
    }
}

export default AddBook;
