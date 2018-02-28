import copy from 'shallow-copy';
import equal from './equal';
import symbol from './symbol';

function update(state, prop, value) {
  const obj = copy(state.obj);
  obj[prop] = value;
  state.obj = obj;
  if (state.parent) {
    update(state.parent, state.key, obj);
  }
}

function proxy({target, parent, key, cb}) {
  
  if (typeof target !== 'object' || target[symbol]) {
    return target;
  }

  if (global[symbol]) {
    return target;
  }

  return new Proxy({
    obj: target,
    parent,
    key,
    [symbol]: true,
  }, {
      set(state, prop, value) {
        if (!equal(state.obj[prop], value)) {
          update(state, prop, value)
        }
        cb();
        return true;
      },
      get(state, prop) {
        if (global[symbol]) {
          return state.obj[prop];
        }
        return proxy({
          target: state.obj[prop],
          parent: state,
          key: prop,
          cb,
        });
      },
      // deleteProperty(state, prop) {
      //   cb();
      //   delete state[prop];
      //   return true;
      // }
    });

}



export default proxy;
