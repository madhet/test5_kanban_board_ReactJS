import React, { useState } from "react";
import TextButton from './TextButton';

export default function InputTitle(props) {

  const { rows, label, labelClass, title, onOpen, onAccept, onCancel, onChange, onBlur, disableButtons, allowBlur = true } = props;

  const [isOpen, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  let isOnBlurAllowed = true;

  function openInput() {
    if (title && newTitle !== title) setNewTitle(title);
    if (onOpen) onOpen();
    setOpen(true);
  }

  function handleChange(event) {
    const value = event.target.value;
    if (onChange) onChange(value);
    setNewTitle(value);
  }

  function clickAdd() {
    if (newTitle && newTitle !== title) {
      if (onAccept) onAccept(newTitle);
    }
    setNewTitle(title);
    setOpen(false);
  }

  function clickCancel() {
    if (onCancel) onCancel();
    setNewTitle(title);
    setOpen(false);
  }

  function handleKeyUp(event) {
    const key = event.key;
    const type = event.target.type;
    if (key === "Escape") {
      clickCancel();
    } else if (key === "Enter") {
      if (type === 'text') clickAdd();
    }
  }

  function blurInput() {
    if (allowBlur && isOnBlurAllowed) {
      if (onBlur) onBlur();
      if (onCancel) onCancel();
      setOpen(false);
    }
  }

  function handleMouseEnter() {
    isOnBlurAllowed = false;
  }

  function handleMouseLeave() {
    isOnBlurAllowed = true;
  }

  return (
    <div className='inplace-input' onClick={ e => e.stopPropagation() }>
      { isOpen ? (
        <div className="input-title-wrapper">
          { rows ? (
            <textarea
              className="input-title"
              autoFocus
              placeholder="Enter title"
              rows={ rows }
              value={ newTitle }
              onChange={ handleChange }
              onKeyUp={ handleKeyUp }
              onBlur={ blurInput }
            />
          ) : (
              <input
                className="input-title"
                type="text"
                autoFocus
                placeholder="Enter title"
                value={ newTitle }
                onChange={ handleChange }
                onKeyUp={ handleKeyUp }
                onBlur={ blurInput }
              />
            )
          }
          { !disableButtons && (
            <div className='button-panel'>
              <TextButton label={ title ? 'Save' : 'Add' }
                onClick={ clickAdd }
                onMouseEnter={ handleMouseEnter }
                onMouseLeave={ handleMouseLeave }
              />
              <TextButton label='Cancel'
                onClick={ clickCancel }
                onMouseEnter={ handleMouseEnter }
                onMouseLeave={ handleMouseLeave }
              />
            </div>
          ) }
        </div>
      ) : (
          <div
            title={ title ? "Double click to edit" : "" }
            className={ labelClass || 'label-text' }
            onClick={ title ? null : openInput }
            onDoubleClick={ title ? openInput : null }
          >
            { label || "Add" }
          </div>
        )
      }
    </div >
  );
}
