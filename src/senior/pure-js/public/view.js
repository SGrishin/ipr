export class View {
  constructor() {
    this.input = document.getElementById('todo-input');
    this.addBtn = document.getElementById('add-btn');
    this.list = document.getElementById('todo-list');
  }

  clearInput() {
    this.input.value = '';
  }

  getInputValue() {
    return this.input.value;
  }

  bindAdd(handler) {
    this.addBtn.addEventListener('click', handler);
  }

  bindDelete(handler) {
    this.list.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        const id = parseInt(e.target.dataset.id, 10);
        handler(id);
      }
    });
  }

  renderTodos(todos) {
    this.list.innerHTML = '';

    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.text;

      const btn = document.createElement('button');
      btn.textContent = 'Удалить';
      btn.dataset.id = todo.id;

      li.appendChild(btn);
      this.list.appendChild(li);
    });
  }
}
