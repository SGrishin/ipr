import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo } from '../../actions/todoList';
import * as styles from "./TodoList.module.css"

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <ul id="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={styles["todo-item"]}>
          {todo.text}
          <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
