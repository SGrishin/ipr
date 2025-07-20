import { takeEvery, put, delay } from 'redux-saga/effects';
import { ADD_TODO_REQUEST, addTodoSuccess } from '../actions/todoList';

function* handleAddTodo(action) {
  // Задержка для имитации асинхронности
  yield delay(500);
  yield put(addTodoSuccess(action.payload));
}

export default function* rootSaga() {
  yield takeEvery(ADD_TODO_REQUEST, handleAddTodo);
}
