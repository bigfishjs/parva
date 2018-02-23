export default () => {

  const LIST = [];
  const SIZE = 5;
  let ID = 0;
  for (let i = 0; i < SIZE; i++) {
    LIST.push({
      text: 'task ' + i,
      completed: false,
      editing: false,
      id: ID++,
    });
  }

  return {
    list: LIST,

    filter: 'all',

    input: '',

    changeAddInput(input) {
      this.input = input;
    },

    add() {
      if (this.input) {
        this.list.push({
          text: this.input,
          completed: false,
          editing: false,
          id: ID++,
        });
      }
      this.input = '';
    },

    changeTodoEdit(todo) {
      todo.editing = !todo.editing;
    },

    changeTodo(todo, text) {
      todo.text = text;
    },

    changeTodoComplete(todo) {
      todo.completed = !todo.completed;
    },

    removeTodo(todo) {
      const id = this.list.indexOf(todo);
      this.list.splice(id, 1);
    },

    changeFilter(filter) {
      this.filter = filter;
    },

    clearCompleted() {
      this.list = this.list.filter(item => !item.completed);
    },

    get activeCount() {
      return this.list.filter(item => !item.completed).length;
    },

    get visibleTodos() {
      switch (this.filter) {
        case 'all':
          return this.list;
        case 'active':
          return this.list.filter(todo => !todo.completed);
        case 'completed':
          return this.list.filter(todo => todo.completed);
      }
    },

  }

};