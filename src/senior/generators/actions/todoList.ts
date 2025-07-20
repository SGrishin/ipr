// Action types
export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const DELETE_TODO = 'DELETE_TODO';

// Action creators
export const addTodoRequest = (text) => ({
  type: ADD_TODO_REQUEST,
  payload: text,
});

export const addTodoSuccess = (text) => ({
  type: ADD_TODO_SUCCESS,
  payload: text,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});
