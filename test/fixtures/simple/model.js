const A = {
  num: 2,
  obj: {
    list: []
  },
  change() {
    this.num = 1;
    this.obj.list.push('list0');
  },
};

const B = {
  text: 'hello',
};

export default {
  A,
  B,
};