import React from 'react';
import { connect } from '../../../src';
import { A } from './model';

@connect({ A })
class Page extends React.Component {
  componentDidMount() {
    this.props.A.change();
  }
  render() {
    return <div>
      {this.props.A.num}
    </div>
  }
}

export default Page;