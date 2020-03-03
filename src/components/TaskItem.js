import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import IconButton from './IconButton';

function TaskItem(props) {

  const { task, openModalEdit, deleteTask } = props;

  return (
    <Draggable draggableId={task.id} index={task.position}>
      {(dragProvided, dragSnapshot) => (
        <li
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
          className='task-item'
          onClick={openModalEdit}>
          <div className='title-panel'>
            <div className='task-title' title='Click to edit'>{task.title}</div>
            <IconButton type='DELETE' onClick={deleteTask} />
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default TaskItem;

/*
<Droppable droppableId="droppable">
  {(droppableProvided, droppableSnapshot) => (
    <div
      ref={droppableProvided.innerRef}
      style={getListStyle(droppableSnapshot.isDraggingOver)}
    >
      {this.state.items.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(draggableProvided, draggableSnapshot) => (
            <div
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}
              {...draggableProvided.dragHandleProps}
              style={getItemStyle(
                draggableSnapshot.isDragging,
                draggableProvided.draggableProps.style
              )}
            >
              {item.content}
            </div>
          )}
        </Draggable>
      ))}
      {droppableProvided.placeholder}
    </div>
  )}
</Droppable>
*/