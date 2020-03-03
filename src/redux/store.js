import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export const unsubscribeStore = store.subscribe(function storeListener() {
  let state = store.getState();
  let kanban = JSON.stringify({
    boards: state.boards,
    columns: state.columns,
    tasks: state.tasks,
  });
  localStorage.setItem('kanban', kanban);
});

export default store;