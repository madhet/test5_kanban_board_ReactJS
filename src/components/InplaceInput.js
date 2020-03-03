import React, { useState, useEffect } from 'react'
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';

export default function InplaceInput(props) {

  const { open, title, onChangeTitle } = props

  const [active, setActive] = useState(open || false)
  const [newTitle, setNewTitle] = useState(title)

  function onInputClose() {
    if (newTitle && newTitle !== title) {
      onChangeTitle(newTitle)
    }
  }

  return (
    <div>
      <Inplace closable={true} active={active} onToggle={(e) => setActive(e.value)} onClose={onInputClose} onClick={e => e.stopPropagation()}>
        <InplaceDisplay>
          {newTitle ? newTitle : title || 'Click to enter title'}
        </InplaceDisplay>
        <InplaceContent>
          <InputText autoFocus placeholder='Enter title' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} /* onBlur={() => setActive(false)} */ />
        </InplaceContent>
      </Inplace>
    </div>
  )
}
