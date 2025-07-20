import React from 'react';
import TodoListApp from "./components/TodoListApp"
import Timeout from "./components/other/Timeout"

function App() {
  return (
    <div style={{ padding: 20 }}>
      <TodoListApp />
      <Timeout />
    </div>
  );
}

export default App;
