import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { dispatchGetState } from '../redux/dispatchers';
import BoardListContainer from '../containers/BoardListContainer';
import BoardContainer from '../containers/BoardContainer';

export default function Kanban() {

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('kanban')) {
      let state = JSON.parse(localStorage.getItem('kanban'));
      dispatchGetState(dispatch, {
        boards: state.boards,
        columns: state.columns,
        tasks: state.tasks,
      });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact={true}
          path="/board/:boardId/task/:taskId"
          component={BoardContainer}
        />
        <Route
          exact={true}
          path="/board/:boardId"
          component={BoardContainer}
        />
        <Route
          exact={true}
          path="/"
          component={BoardListContainer}
        />
      </Switch>
    </BrowserRouter>
  );
}
