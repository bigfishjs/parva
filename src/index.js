import React from 'react';
import WeakMap from 'es6-weak-map';
import proxy from './proxy';

const modelMap = new WeakMap();

const connect = map => Comp => class extends React.Component {
  constructor(props) {
    super(props);
    for (const key in map) {
      const model = map[key];
      let obj = modelMap.get(model);
      if (!obj) {
        obj = {
          components: [this],
        };
        modelMap.set(model, obj);
      } else {
        obj.components.push(this);
      }

      const data = {};
      for (const name in model) {
        const val = model[name];
        if (typeof val === 'function') {
          data[name] = (...args) => {
            const obj = modelMap.get(model);
            if (obj) {
              const proxyData = proxy(obj.data, () => {
                this.update(proxyData)
              });
              return val.call(proxyData, ...args);
            }
          }
        } else {
          data[name] = val;
        }
      }
      obj.data = data;
    }
  }
  componentWillUnmount() {
    for (const key in map) {
      const model = map[key];
      const obj = modelMap.get(model);
      if (obj) {
        const index = obj.components.indexOf(this);
        if (index >= 0) {
          obj.components.splice(index, 1);
          if (obj.components.length === 0) {
            modelMap.delete(model);
          }
        }
      }
    }
  }
  update(data) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      for (const key in map) {
        const model = map[key];
        const obj = modelMap.get(model);
        if (obj) {
          obj.data = data;
          obj.components.forEach(item => {
            item.forceUpdate();
          });
        }
      }
    }, 0);
  }
  render() {
    const props = {};
    for (const key in map) {
      const model = map[key];
      const obj = modelMap.get(model);
      props[key] = obj.data;
    }
    return <Comp {...this.props} {...props} />;
  }
}

export default {
  connect,
};
