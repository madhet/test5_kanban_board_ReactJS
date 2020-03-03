import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchCreateColumn, dispatchMoveTaskTo } from '../redux/dispatchers';
import cuid from 'cuid';
import { DragDropContext } from "react-beautiful-dnd";
import ColumnList from '../components/ColumnList';

function ColumnListContainer(props) {

  const { match: { params: { boardId } } } = props;

  const columns = useSelector(state => {
    return state.columns.filter(column => column.board_id === boardId);
  });

  const dispatch = useDispatch();

  function clickAddColumn(newTitle) {
    let newColumn = {
      id: cuid(),
      board_id: boardId,
      title: newTitle,
    };
    dispatchCreateColumn(dispatch, newColumn);
  }

  function onDragEnd(result) {
    // console.log(result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    dispatchMoveTaskTo(dispatch, result.draggableId, result.destination.droppableId, result.destination.index);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ColumnList columns={columns} clickAddColumn={clickAddColumn} />
    </DragDropContext>
  );
}

export default withRouter(ColumnListContainer);