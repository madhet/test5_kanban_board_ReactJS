import React from 'react'

function KanbanHeader(props) {
  return (
    <div className='kanban-header'>
      {props.children}
    </div>
  )
}

export default KanbanHeader;