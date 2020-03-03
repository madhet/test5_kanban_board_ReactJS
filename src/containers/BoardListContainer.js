import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchCreateBoard, dispatchSetSuccessMessage } from '../redux/dispatchers';
import cuid from 'cuid';
import KanbanHeader from '../components/KanbanHeader'
import BoardList from '../components/BoardList';

function BoardListContainer(props) {

  const boards = useSelector(state => state.boards);

  const dispatch = useDispatch();

  function clickCreateBoard(newTitle) {
    let newBoard = {
      id: cuid(),
      title: newTitle,
    };
    dispatchCreateBoard(dispatch, newBoard);
    dispatchSetSuccessMessage(dispatch, ['Board created']);
  }

  return (
    <div>
      <KanbanHeader>
        <div className='board-title-panel'>
          <div className='board-title'>Kanban board</div>
        </div>
        <hr />
      </KanbanHeader>
      <BoardList
        boards={boards}
        clickCreateBoard={clickCreateBoard}
      />
    </div>
  );
}

export default withRouter(BoardListContainer);
