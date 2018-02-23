import React from 'react';
import { connect } from '../../../src';
import { A, B } from './model';

@connect({ A, B })
class Page extends React.Component {
  render() {
    return <div>
      {this.props.A.num}
      {this.props.B.text}
    </div>
  }
}

export default Page;