### Parva

You don't need "Redux" or "Immutable Data". You only need a simple and convenient data state management.

Parva is a react data state management tool, you only need to define your data, then connect to your component.

### Installation

```
$ npm install --save parva 
```

### Example


```javascript
import { connect } from "parva"

const data = {
  
  num: 2,
  
  async change() {
    // You can use "await", eg: await fetch(); 
    this.num = 1
  }

  // You can also use "function"
  /*
  change() {
    this.num = 3
  }
  */

}

@connect({
  data
})
class Page extends React.Component {
  componentDidMount() {
    this.props.data.change() // return Promise
  }
  render() {
    return <div>
      num: {this.props.data.num}
    </div>
  }
}
```

more:

- [todolist](https://github.com/bigfishjs/parva/tree/master/example/todolist)