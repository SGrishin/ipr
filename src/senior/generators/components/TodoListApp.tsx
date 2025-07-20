import React from 'react';
import TodoInput from './todoList/TodoInput';
import TodoList from './todoList/TodoList';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Todo List (Redux-Saga)</h2>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
