import React from 'react';
import WeakMap from 'es6-weak-map';
import shallowequal from 'shallowequal';
import proxy from './proxy';
import symbol from './symbol';


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
          data: {},
        };
        modelMap.set(model, obj);
      } else {
        obj.components.push(this);
      }

      const data = {};
      const array =[];
      for (const name in model) {
        const val = model[name];
        if (typeof val === 'function') {
          data[name] = (...args) => {
            const obj = modelMap.get(model);
            if (obj) {
              const proxyData = proxy({
                target: obj.data,
                cb: () => {
                  const nextData = {};
                  global[symbol] = true;
                  array.forEach(item => {
                    nextData[item] = proxyData[item];
                  });
                  this.update(nextData);
                  global[symbol] = false;
                }
              });
              const result = val.call(proxyData, ...args);
              return result;
            }
          }
        } else {
          data[name] = val;
        }
        array.push(name);
      }
      
      obj.data = data;
    }
  }
  update(data) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      for (const key in map) {
        const model = map[key];
        const obj = modelMap.get(model);
        if (obj) {
          if (!shallowequal(obj.data, data)) {
            obj.data = data;
          }
          obj.components.forEach(item => {
            item.forceUpdate();
          });
        }
      }
    }, 0);
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
