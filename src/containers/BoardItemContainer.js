import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { actionUpdateBoard, actionDeleteBoard } from '../redux/actions'
import { dispatchUpdateBoard, dispatchDeleteBoard } from '../redux/dispatchers';
import BoardItem from '../components/BoardItem';

function BoardItemContainer(props) {

  const { boardId, history } = props;

  const board = useSelector(state => state.boards.find(board => board.id === boardId));
  const columnCount = useSelector(state => state.columns.filter(column => column.board_id === boardId).length);
  const taskCount = useSelector(state => state.tasks.filter(task => task.board_id === boardId).length);

  const dispatch = useDispatch();

  function deleteBoard() {
    dispatchDeleteBoard(dispatch, boardId);
  }

  function clickBoard() {
    history.push(`/board/${boardId}`);
  }

  function updateBoard(newTitle) {
    if (board.title === newTitle) return;
    dispatchUpdateBoard(dispatch, { id: board.id, title: newTitle });
  }

  return <BoardItem board={board} columnCount={columnCount} taskCount={taskCount} clickBoard={clickBoard} updateBoard={updateBoard} deleteBoard={deleteBoard} />;
}

export default withRouter(BoardItemContainer);
