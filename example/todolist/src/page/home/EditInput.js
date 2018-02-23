import React from 'react';
import { connect } from 'parva';
import model from './model';

@connect({ model })
class EditInput extends React.Component {
  handleChange = e => {
    const todo = this.props.todo;
    this.props.model.changeTodo(todo, e.target.value);
  }
  handleSubmit = e => {
    e.preventDefault()
    const todo = this.props.todo;
    this.props.model.changeTodoEdit(todo);
  }
  handleBlur = e => {
    const todo = this.props.todo;
    this.props.model.changeTodoEdit(todo);
  }
  render() {
    return <form onSubmit={this.handleSubmit}>
      <input type="text"
        className="edit"
        autoFocus="true"
        value={this.props.todo.text}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    </form>;
  }
}

export default EditInput;
