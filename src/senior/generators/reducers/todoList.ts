import { ADD_TODO_SUCCESS, DELETE_TODO } from '../actions/todoList';

const initialState = {
  todos: [],
};

let nextId = 1;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, { id: nextId++, text: action.payload }],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}
