import React from 'react';
import { Link } from "react-router-dom";
import { connect } from '../../../../../lib';


const model = {
  a: 1,
  
  obj: {
    a: 1
  },
  async change() {
    this.obj.a = 2;
    await new Promise(r => setTimeout(r, 1000));
    this.obj.a = 3;
    await new Promise(r => setTimeout(r, 1000));
    this.obj.a = 4;
    this.obj.a = 5;
    this.obj.a = 6;
  }
}

@connect({
  model
})
class Page extends React.Component {
  componentDidMount() {
    this.props.model.change();
  }
  render() {
    console.log('x')
    return <div>
      {this.props.model.obj.a}
    </div>
  }
}

export default Page;