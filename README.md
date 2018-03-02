Parva is a react data state management tool, you only need to define and modify your data, all changes follow the "immutable data".


```javascript
const state = {
  a: 1,
  list: ['a', 'b'],
  obj: {
    a: 1,
    b: 2,
    c: 3,
  },
};
const proxyState = parva({
  target: state,
  onChange: (nextState) => {
    console.log(nextState.list); //  ['a', 'b', 'x']
    console.log(nextState.obj === state.obj) // true; 
  },
});

proxyState.list.push('x');

```

### Browser Support

es6 https://caniuse.com/#search=proxy