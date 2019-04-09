import React, { Component } from 'react';
import './App.css';


class BookItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false
        };

        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    onDelete() {
        const { onDelete, title } = this.props;
        onDelete(title);
    }

    onEdit() {
        this.setState({ isEdit: true });
    }

    onEditSubmit(event) {
        event.preventDefault();
        this.props.onEditSubmit(this.titleInput.value, this.authorInput.value, this.props.title);

        this.setState({isEdit: false});
    }

    render() {
        const { title, author } = this.props;

        return (
            <div>
                {
                    this.state.isEdit
                        ? (
                            <form onSubmit={this.onEditSubmit}>
                                <input
                                    placeholder="Title"
                                    ref={titleInput => this.titleInput = titleInput}
                                    defaultValue={title} />
                                <input
                                    placeholder="Author"
                                    ref={authorInput => this.authorInput = authorInput}
                                    defaultValue = {author}
                                    />
                                <button>Save</button>
                            </form>
                        )
                        : (
                            <div>
                                <span>{title}</span>
                                {' | '}
                                <span>{author}</span>
                                {' | '}
                                <button onClick={this.onEdit}>Edit</button>
                                {' | '}
                                <button onClick={this.onDelete}>Delete</button>
                            </div>
                        )
                }
            </div>
        );
    }
}

export default BookItem;
