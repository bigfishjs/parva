import parva from '../src';

describe('parva', () => {
  
  test('base', async () => {

    const array = [];
    let num = 0;

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
        array[num++](nextState);
      },
    });

    array.push((nextState) => {
      expect(nextState === state).toBe(false);
      expect(nextState.list === state.list).toBe(true);
      expect(nextState.obj === state.obj).toBe(true);
      expect(nextState.a).toBe(2);
      expect(nextState.list.length).toBe(2);
    });
    proxyState.a = 2;
    

    array.push((nextState) => {
      expect(nextState === state).toBe(false);
      expect(nextState.list === state.list).toBe(false);
      expect(nextState.obj === state.obj).toBe(true);
      expect(nextState.list.length).toBe(3);
    });
    proxyState.list.push('c');


    array.push((nextState) => {
      expect(nextState === state).toBe(false);
      expect(nextState.list === state.list).toBe(false);
      expect(nextState.obj === state.obj).toBe(false);
      expect(nextState.obj).toEqual({
        a: 1,
        b: 2
      });
    });
    delete proxyState.obj.c;
    

    expect(Object.keys(proxyState.obj)).toEqual(['a', 'b']);
    expect(() => Object.keys(proxyState.list)).toThrow();
    expect(proxyState.obj.hasOwnProperty('b')).toBe(true);
    expect(proxyState.obj.hasOwnProperty('c')).toBe(false);
    expect(proxyState.obj.a).toBe(1);
    expect(proxyState.obj.b).toBe(2);

  });
});