import React from 'react';
import classnames from 'classnames';
import { connect } from 'parva';
import EditInput from './EditInput';
import model from './model';


@connect({ model })
class Todo extends React.Component {
  handleChange = () => {
    this.props.model.changeTodoComplete(this.props.todo);
  }
  handleDoubleClick = () => {
    this.props.model.changeTodoEdit(this.props.todo);
  }
  handleRemove = () => {
    this.props.model.removeTodo(this.props.todo);
  }
  render() {
    const { todo } = this.props;
    return <li className={classnames({
      completed: todo.completed,
      editing: todo.editing,
    })}>

      {
        todo.editing ?

          <EditInput todo={todo} />

          :

          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={this.handleChange} />
            <label onDoubleClick={this.handleDoubleClick}>
              {todo.text}
            </label>
            <button className="destroy" onClick={this.handleRemove} />
          </div>

      }

    </li>;
  }

}

export default Todo;
