import React from 'react'

export default function TextButton(props) {

  const { label, onClick, onMouseEnter, onMouseLeave } = props;

  return (
    <button className='text-button'
      onClick={onClick}
      onMouseEnter={onMouseEnter || null}
      onMouseLeave={onMouseLeave || null}
    >
      {label}
    </button>
  )
}
