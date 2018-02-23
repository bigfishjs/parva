import React from 'react';
import { connect } from '../../../src';
import { A, B } from './model';

@connect({ A, B })
class Page extends React.Component {
  componentDidMount() {
    this.props.A.change();
  }
  render() {
    return <div>
      {this.props.A.num}
      {this.props.B.num}
    </div>
  }
}

export default Page;