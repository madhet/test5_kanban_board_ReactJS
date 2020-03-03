import React from 'react'
import BoardItemContainer from '../containers/BoardItemContainer'
import InputTitle from './InputTitle'

export default function BoardList(props) {

  const { boards, clickCreateBoard } = props;

  return (
    <ul className='board-list'>
      <li className='board-item add-board-button'>
        <InputTitle label='Create board' labelClass='label-text' title='' onAccept={clickCreateBoard} />
      </li>
      {boards && boards.length > 0 && boards.map(board => <BoardItemContainer key={board.id} boardId={board.id} />)}
    </ul >
  )
}
