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
      {this.props.A.obj.list[0]}
    </div>
  }
}

export default Page;