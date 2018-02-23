import React from 'react';
import { connect } from 'parva';
import AddInput from './AddInput';
import Todo from './Todo';
import Footer from './Footer';
import model from './model';


@connect({ model })
class Page extends React.Component {
  render() {
    const { visibleTodos } = this.props.model;
    return <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>
      <AddInput />
      <div className="main">
        <ul className="todo-list">
          {
            visibleTodos.map(todo =>
              <Todo key={todo.id} todo={todo} />
            )
          }
        </ul>
        <Footer />
      </div>
    </div>
  }
}

export default Page;
