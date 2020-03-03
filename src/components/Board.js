import React from 'react';
import KanbanHeader from './KanbanHeader'
import TextButton from "./TextButton";
import ColumnListContainer from '../containers/ColumnListContainer';
import TaskModal from './TaskModal';

export default function Board(props) {

  const { board, taskId, backToBoards } = props;

  return (
    <div className='board-body'>
      <KanbanHeader>
        <div className='board-title-panel'>
          <TextButton label='< Boards' onClick={backToBoards} />
          <div className='delim-slash'>/</div>
          <div className='board-title'>{board.title}</div>
        </div>
        <hr />
      </KanbanHeader>
      <ColumnListContainer />
      {taskId && <TaskModal />}
    </div>
  );
}
