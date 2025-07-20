export class Model {
  constructor() {
    this.todos = [];
  }

  addTodo(text) {
    const todo = { id: Date.now(), text };
    this.todos.push(todo);
    return todo;
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  getTodos() {
    return this.todos;
  }
}
