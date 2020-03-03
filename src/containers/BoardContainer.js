import React from 'react'
import { withRouter } from "react-router";
import { useSelector } from 'react-redux'
import Board from '../components/Board'

function BoardContainer(props) {

  const { match: { params: { boardId, taskId } }, history } = props;

  const board = useSelector(state => state.boards.find(board => board.id === boardId))

  function backToBoards() {
    history.push('/')
  }

  if (board) {
    return <Board board={board} taskId={taskId} backToBoards={backToBoards} />
  }

  return null;
}

export default withRouter(BoardContainer)
