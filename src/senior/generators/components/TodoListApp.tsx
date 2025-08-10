import React from 'react';
import TodoInput from './todoList/TodoInput';
import TodoList from './todoList/TodoList';
import './TodoListApp.css'

function App() {
  return (
    <div className='todo-list-app'>
      <h2>Todo List (Redux-Saga)</h2>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
