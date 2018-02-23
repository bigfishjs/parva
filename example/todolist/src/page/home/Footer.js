import React from 'react';
import classnames from 'classnames';
import { connect } from 'parva';
import model from './model';


@connect({ model })
class Footer extends React.Component {
  render() {
    const { activeCount, list, filter, changeFilter } = this.props.model;
    const completedCount = list.length - activeCount;
    return <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong>
        {' '}
        {activeCount === 1 ? 'item' : 'items'} left
      </span>
      <ul className="filters">
        {['all', 'active', 'completed'].map(item =>
          <li key={item}>
            <a className={classnames({ selected: item === filter })}
              style={{ cursor: 'pointer' }}
              onClick={() => changeFilter(item)}
            >
              {item}
            </a>
          </li>
        )}
      </ul>
      {
        completedCount > 0
        &&
        <button className="clear-completed"
          onClick={() => this.props.model.clearCompleted()} >
          Clear completed
        </button>
      }
    </footer>;
  }
}

export default Footer;
