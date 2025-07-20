import { Model } from './model.js';
import { View } from './view.js';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindAdd(this.handleAddTodo);
    this.view.bindDelete(this.handleDeleteTodo);

    this.updateView();
  }

  handleAddTodo = () => {
    const text = this.view.getInputValue();
    if (text.trim() !== '') {
      this.model.addTodo(text);
      this.view.clearInput();
      this.updateView();
    }
  };

  handleDeleteTodo = (id) => {
    this.model.deleteTodo(id);
    this.updateView();
  };

  updateView() {
    const todos = this.model.getTodos();
    this.view.renderTodos(todos);
  }
}

new Controller(new Model(), new View());
