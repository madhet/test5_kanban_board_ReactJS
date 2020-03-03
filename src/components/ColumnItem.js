import React from 'react'
import IconButton from './IconButton'
import InputTitle from './InputTitle'
import TaskListContainer from '../containers/TaskListContainer'

export default function ColumnItem(props) {

  const { column, updateColumn, deleteColumn } = props;

  return (
    <li className='column-item'>
      <div className='title-panel'>
        <InputTitle label={column.title} labelClass='column-title' title={column.title} onAccept={updateColumn} />
        <IconButton type='DELETE' onClick={deleteColumn} />
      </div>
      <hr />
      <TaskListContainer columnId={column.id} />
      {/* <div className='column-body'>
        <InputTitle label='Create task' labelClass='label-text' title='' onAccept={createTask} />
        
      </div> */}
    </li>
  )
}
