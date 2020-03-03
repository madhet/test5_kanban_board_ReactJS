import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import TaskItemContainer from '../containers/TaskItemContainer';

export default function TaskList(props) {

  const { columnId, tasks, openModalCreate } = props;

  return (
    <ul className='tasks-list'>
      <li className='task-item task-add' onClick={openModalCreate} >
        <div className='label-text'>Add task</div>
        {/* <InputTitle label='Add task' title='' onAccept={createTask} /> */}
      </li>
      <Droppable droppableId={columnId}>
        {(dropProvided, dropSnapshot) => (
          <div
            ref={dropProvided.innerRef}
            style={{ minHeight: '1px' }}
          >
            {tasks && tasks.length > 0 && tasks.map(task => <TaskItemContainer key={task.id} taskId={task.id} />)}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </ul>
  );
}
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