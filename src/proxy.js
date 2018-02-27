import Symbol from 'es6-symbol';
const PROXY = Symbol('parva-proxye');


function proxy(obj, cb, list = []) {
  if (typeof obj !== 'object' || obj.PROXY_STATE) {
    return {
      proxy: obj,
      revoke() {},
    };
  }
  obj[PROXY] = true;
  
  const revocable = Proxy.revocable(obj, {
    set(state, prop, value) {
      let changed = false;
      if (state[prop] !== value) {
        changed = true;
      }
      state[prop] = value;
      if (changed) {
        cb();
      }
      return true;
    },
    get(state, prop) {
      return proxy(state[prop], cb, list).proxy;
    },
    deleteProperty(state, prop) {
      cb();
      delete state[prop];
      return true;      
    }
  });

  list.push(revocable.revoke);

  return {
    proxy: revocable.proxy,
    revoke() {
      list.forEach(revoke => revoke());
    }
  }

}

export default proxy;
