import React from 'react';
import { connect } from 'parva';
import model from './model';


@connect({ model })
class TodoInput extends React.Component {
  handleChange = e => {
    this.props.model.changeAddInput(e.target.value);
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.model.add();
  }
  render() {
    return <form onSubmit={this.handleSubmit}>
      <input type="text"
        className="new-todo"
        autoFocus="true"
        placeholder="What needs to be done?"
        value={this.props.model.input}
        onChange={this.handleChange}
      />
    </form>;
  }
}

export default TodoInput;
