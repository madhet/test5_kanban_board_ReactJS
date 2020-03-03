import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sortByPositionAscending } from '../helpers';
// import cuid from 'cuid'
import TaskList from '../components/TaskList';

function TaskListContainer(props) {

  const { columnId, history } = props;

  const column = useSelector(state => state.columns.find(column => column.id === columnId));

  let tasks = useSelector(state => state.tasks.filter(task => task.column_id === columnId))
    .sort(sortByPositionAscending);

  function openModalCreate() {
    history.push(`/board/${column.board_id}/task/new`, { mode: 'NEW', columnId });
  }

  // function createTask(newTitle) {
  //   let task = {
  //     id: cuid(),
  //     column_id: columnId,
  //     board_id: column.board_id,
  //     title: newTitle,
  //     description: '',
  //     position: tasks.length,
  //     createdAt: new Date(),
  //     editedAt: new Date()
  //   }
  //   dispatch(actionCreateTask(task))
  // }

  return <TaskList columnId={columnId} tasks={tasks} openModalCreate={openModalCreate} /*createTask={createTask}*/ />;
}

export default withRouter(TaskListContainer);
