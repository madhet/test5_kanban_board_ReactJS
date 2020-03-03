import React from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { dispatchDeleteTask } from '../redux/dispatchers'
import TaskItem from '../components/TaskItem'

function TaskItemContainer(props) {

  const { taskId, history } = props;

  const task = useSelector(state => {
    return state.tasks.find(task => task.id === taskId)
  })

  const dispatch = useDispatch()

  function openModalEdit() {
    history.push(`/board/${task.board_id}/task/${taskId}`, { mode: 'EDIT', columnId: task.column_id })
  }

  function deleteTask(event) {
    event.stopPropagation();
    dispatchDeleteTask(dispatch, taskId)
  }

  return <TaskItem task={task} openModalEdit={openModalEdit} deleteTask={deleteTask} />
}

export default withRouter(TaskItemContainer)
