import TodoRepository from './repository.js';

// Business Logic Layer
class TodoService {
  constructor() {
    this.repository = new TodoRepository();
  }

  getAllTodos() {
    return this.repository.getAll();
  }

  addTodo(text) {
    if (!text.trim()) throw new Error("Text cannot be empty");
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    return this.repository.add(newTodo);
  }

  toggleTodo(id) {
    const todo = this.repository.complete(id);
    if (!todo) throw new Error("Todo not found");
    return todo;
  }

  deleteTodo(id) {
    const success = this.repository.delete(id);
    if (!success) throw new Error("Todo not found");
    return id;
  }
}

export default TodoService;