import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchUpdateColumn, dispatchDeleteColumn } from '../redux/dispatchers';
import ColumnItem from '../components/ColumnItem';

export default function ColumnItemContainer(props) {

  const { columnId } = props;

  const column = useSelector(state => {
    return state.columns.find(column => column.id === columnId);
  });

  const dispatch = useDispatch();

  function deleteColumn() {
    dispatchDeleteColumn(dispatch, columnId);
  }

  function updateColumn(newTitle) {
    if (column.title === newTitle) return;
    let updColumn = {
      id: columnId,
      title: newTitle,
    };
    dispatchUpdateColumn(dispatch, updColumn);
  }

  return (
    <ColumnItem column={column} updateColumn={updateColumn} deleteColumn={deleteColumn} />
  )
}
