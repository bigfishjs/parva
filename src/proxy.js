import Symbol from 'es6-symbol';
const PROXY = Symbol('parva-proxye');


function proxy(obj, cb) {
  if (typeof obj !== 'object' || obj.PROXY_STATE) {
    return obj;
  }
  obj[PROXY] = true;
  
  return new Proxy(obj, {
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
      return proxy(state[prop], cb);
    },
    deleteProperty(state, prop) {
      cb();
      delete state[prop];
      return true;      
    }
  });

}

export default proxy;
