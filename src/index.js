import React from 'react';

const list = [];

const connect = map => Comp => class extends React.Component {
  constructor(props) {
    super(props);
    for (const key in map) {
      const model = map[key];
      const obj = list.find(item => item.model === model);
      if (obj) {
        if (obj.components.indexOf(this) < 0) {
          obj.components.push(this);
        }
      } else {
        list.push({
          model,
          components: [this]
        });
      }
    }
  }
  componentWillUnmount() {
    for (const key in map) {
      const model = map[key];
      const obj = list.find(item => item.model === model);
      if (obj) {
        const index = obj.components.indexOf(this);
        if (index >= 0) {
          obj.components.splice(index, 1);
          if (obj.components.length === 0) {
            list.splice(list.indexOf(obj), 1);
          }
        }
      }
    }
  }
  update() {
    for (const key in map) {
      const model = map[key];
      const obj = list.find(item => item.model === model);
      if (obj) {
        obj.components.forEach(item => {
          item.forceUpdate();
        });
      }
    }
  }
  render() {
    const props = {};
    for (const key in map) {
      const model = map[key];
      const obj = {};
      for (const name in model) {
        const val = model[name];
        if (typeof val === 'function') {
          obj[name] = (...args) => {
            const x = val.call(model, ...args);
            if (x && x.then) {
              x.then(() => {
                this.update();
              }).catch(err => {
                console.log(err);
              });
            }
            this.update();
            return x;
          };
        } else {
          obj[name] = val;
        }
      }
      props[key] = obj;
    }
    return <Comp {...this.props} {...props} />;
  }
}

export default {
  connect,
};
