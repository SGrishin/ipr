// Data Access Layer
class TodoRepository {
  constructor() {
    this.todos = [];
  }

  getAll() {
    return this.todos;
  }

  add(todo) {
    this.todos.push(todo);
    return todo;
  }

  complete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
    return todo;
  }

  delete(id) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default TodoRepository;