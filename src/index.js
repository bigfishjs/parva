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
              let changed = false;
              let changedData;
              const { proxy: proxyData, revoke } = proxy(obj.data, () => {
                changed = true;
                changedData = proxyData;
              });
              const result = val.call(proxyData, ...args);
              if (changed) {
                this.update(changedData);
              }
              if (result && result.then) {
                result.then(() => {
                  if (changed) {
                    this.update(changedData);
                  }
                  revoke();
                });
              }
              return result;
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
