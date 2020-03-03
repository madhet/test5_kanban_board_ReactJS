import React from 'react'
import InputTitle from './InputTitle'
import ColumnItemContainer from '../containers/ColumnItemContainer'

export default function ColumnList(props) {

  const { columns, clickAddColumn } = props;

  return (
    <ul className='column-list'>
      <li className='column-item'>
        <InputTitle label='Add column' labelClass='label-text' title='' onAccept={clickAddColumn} />
      </li>
      {columns && columns.length > 0 && columns.map(column => <ColumnItemContainer key={column.id} columnId={column.id} />)}
    </ul>
  )
}