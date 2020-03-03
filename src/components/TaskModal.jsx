import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchCreateTask, dispatchUpdateTask, dispatchDeleteTask } from '../redux/dispatchers';
import cuid from 'cuid';
import InputTitle from './InputTitle';
import TextButton from './TextButton';

function TaskModal(props) {

  const { match: { params: { boardId, taskId } }, location: { state: { mode, columnId } }, history } = props;

  const dispatch = useDispatch();

  const task = useSelector(state => state.tasks.find(task => task.id === taskId));

  const tasks = useSelector(state => state.tasks.filter(task => task.column_id === columnId));

  const board = useSelector(state => state.boards.find(board => board.id === boardId));

  const column = useSelector(state => state.columns.find(column => column.id === columnId));

  const [current, setCurrent] = useState({
    id: '',
    column_id: '',
    board_id: '',
    title: '',
    description: '',
    position: 0,
    createdAt: null,
    editedAt: null
  });

  const [emptyTitleMessage, setEmptyTitleMessage] = useState('');
  const [allowBlur, setAllowBlur] = useState(true);

  const labelClass = emptyTitleMessage ? 'label-text error' : '';

  useEffect(() => {
    if (mode === 'EDIT' && task) {
      setCurrent(task);
    }
  }, [mode, task]);

  function closeModal() {
    history.push(`/board/${boardId}`);
  }

  function validateTitle() {
    if (current.title) return false;
    setEmptyTitleMessage('Field is required!');
    return true;
  }

  function createTask(event) {
    event.preventDefault();
    if (validateTitle()) return;
    let newTask = {
      id: cuid(),
      column_id: columnId,
      board_id: column.board_id,
      title: current.title,
      description: current.description,
      position: tasks.length,
      createdAt: new Date(),
      editedAt: null
    };
    dispatchCreateTask(dispatch, newTask);
    closeModal();
  }

  function updateTask(event) {
    event.preventDefault();
    if (validateTitle()) return;
    if (task.title !== current.title || task.description !== current.description) {
      let updTask = {
        id: current.id,
        title: current.title,
        description: current.description,
        editedAt: new Date(),
      };
      dispatchUpdateTask(dispatch, updTask);
    }
    closeModal();
  }

  function deleteTask(event) {
    event.preventDefault();
    dispatchDeleteTask(dispatch, task.id);
    closeModal();
  }

  function changeInput(event) {
    const { name, value } = event.target;
    setCurrent(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function changeTitle(newTitle) {
    if (emptyTitleMessage) setEmptyTitleMessage('');
    setCurrent(prev => {
      return {
        ...prev,
        title: newTitle,
      };
    });
  }

  function changeDescription(newDescription) {
    setCurrent(prev => {
      return {
        ...prev,
        description: newDescription,
      };
    });
  }

  function clickCancel(event) {
    event.preventDefault();
    closeModal();
  }

  function handleFocus() {
    if (emptyTitleMessage) setEmptyTitleMessage('');
  }

  function handleMouseEnter() {
    setAllowBlur(false);
  }

  function handleMouseLeave() {
    setAllowBlur(true);
  }

  return (
    <div className={'modal-wrapper' + (taskId ? ' open' : '')}
      onClick={closeModal}
    >
      <form className='task-form'
        onClick={e => e.stopPropagation()}
        onSubmit={e => e.preventDefault()}
      >
        <div>{`${board.title} / ${column.title} /`}</div>
        <hr />
        {mode === 'NEW' ? (
          <div className='form-field-wrapper'>
            <textarea
              autoFocus
              className={`task-textarea${emptyTitleMessage && ' error'}`}
              name="title"
              id="title"
              rows="3"
              placeholder={emptyTitleMessage || 'Enter title'}
              value={current.title}
              onChange={changeInput}
              onFocus={handleFocus}
            />
          </div>
        ) : (
          <div className='form-field-wrapper'>
              <InputTitle
                disableButtons={true}
                allowBlur={allowBlur}
                rows={3}
                label={emptyTitleMessage || current.title || 'Add title'}
                labelClass={current.title ? 'task-title' : labelClass}
                title={current.title}
                onChange={changeTitle}
                onOpen={handleFocus}
              />
            </div>
          )
        }
        <hr />
        {mode === 'NEW' ? (
          <div className='form-field-wrapper'>
            <textarea
              className='task-textarea'
              name="description"
              id="description"
              rows="6"
              value={current.description}
              onChange={changeInput}
            />
          </div>
        ) : (
            <div className='form-field-wrapper'>
              <InputTitle
                disableButtons={true}
                allowBlur={allowBlur}
                rows={6}
                label={current.description || 'Add description'}
                labelClass={current.description ? 'task-description' : ''}
                title={current.description}
                onChange={changeDescription}
              />
            </div>
          )
        }
        <hr />
        <div className='form-field-wrapper'>
          <div className='task-details'>
            {`Column: ${column ? column.title : ''}`}
          </div>
          <div className='task-details'>
            {`Created: ${current.createdAt ? new Date(current.createdAt).toLocaleString() : ''}`}
          </div>
          <div className='task-details'>
            {`Edited: ${current.editedAt ? new Date(current.editedAt).toLocaleString() : ''}`}
          </div>
        </div>
        <div className='button-panel'>
          <div>
            <TextButton 
              label={mode === 'NEW' ? 'Create' : 'Save'} 
              onClick={mode === 'NEW' ? createTask : updateTask} 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <TextButton 
              label='Cancel' 
              onClick={clickCancel} 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
          {mode === 'EDIT' && <TextButton label='Delete' onClick={deleteTask} />}
        </div>
      </form>
    </div >
  );
}

export default withRouter(TaskModal);
