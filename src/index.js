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

function del(state, prop) {
  const obj = copy(state.obj);
  delete obj[prop];
  state.obj = obj;
  if (state.parent) {
    update(state.parent, state.key, obj);
  }
}

function proxy({target, parent, key, onChange, root}) {
  if (typeof target !== 'object' || target[symbol]) {
    return target;
  }

  const val = {
    root,
    obj: target,
    parent,
    key,
    [symbol]: true,
  };
  val.root = val.root || val;
  return new Proxy(val, {
      set(state, prop, value) {
        if (!equal(state.obj[prop], value)) {
          update(state, prop, value)
          onChange(state.root.obj);
       }
        return true;
      },
      get(state, prop) {
        return proxy({
          root: val.root,
          target: state.obj[prop],
          parent: state,
          key: prop,
          onChange,
        });
      },
      ownKeys(target) {
        return Reflect.ownKeys(target.obj);
      },
      getOwnPropertyDescriptor(state, prop) {
        const descriptor = Reflect.getOwnPropertyDescriptor(state.obj, prop);
        if (descriptor && !(Array.isArray(state.obj) && prop === "length")) {
          descriptor.configurable = true;
        }
        return descriptor;
      },
      deleteProperty(state, prop) {
        del(state, prop)
        onChange(state.root.obj);
        return true;
      }
    });

}



export default proxy;
