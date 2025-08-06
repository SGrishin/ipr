import TodoService from './service.js';

// Presentation Layer
class TodoApp {
  constructor() {
    this.service = new TodoService();
    this.todoInput = document.getElementById('todo-input');
    this.addButton = document.getElementById('add-btn');
    this.todoList = document.getElementById('todo-list');

    this.addButton.addEventListener('click', () => this.addTodo());
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo();
    });

    this.renderTodos();
  }

  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return;

    try {
      this.service.addTodo(text);
      this.todoInput.value = '';
      this.renderTodos();
    } catch (error) {
      alert(error.message);
    }
  }

  renderTodos() {
    const todos = this.service.getAllTodos();
    this.todoList.innerHTML = '';

    todos.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.className = 'todo-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

      const textSpan = document.createElement('span');
      textSpan.textContent = todo.text;
      textSpan.style.textDecoration = todo.completed ? 'line-through' : 'none';

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

      todoItem.append(checkbox, textSpan, deleteBtn);
      this.todoList.appendChild(todoItem);
    });
  }

  toggleTodo(id) {
    this.service.toggleTodo(id);
    this.renderTodos();
  }

  deleteTodo(id) {
    this.service.deleteTodo(id);
    this.renderTodos();
  }
}

document.addEventListener('DOMContentLoaded', () => new TodoApp());