import React from 'react'
import InputTitle from './InputTitle'
import IconButton from './IconButton'

export default function BoardItem(props) {

  const { board, columnCount, taskCount, clickBoard, updateBoard, deleteBoard } = props;

  return (
    <li className='board-item' onClick={clickBoard}>
      <div className='title-panel' onClick={e => e.stopPropagation()}>
        <InputTitle label={board.title} labelClass='board-title' title={board.title} onAccept={updateBoard} />
        <IconButton type='DELETE' onClick={deleteBoard} />
      </div>
      <hr />
      <div className='board-details'>{`Columns: ${columnCount}`}</div>
      <div className='board-details'>{`Tasks: ${taskCount}`}</div>
    </li>
  )
}
