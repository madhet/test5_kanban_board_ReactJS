import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Growl } from 'primereact/growl';
import { dispatchClearMessage } from '../redux/dispatchers';

export let dialogSuccess;
export let dialogError;
export let dialogMany;

function Message() {

  const dispatch = useDispatch();
  const messages = useSelector(state => {
    return state.messages || [];
  });

  const growl = useRef(null);

  useEffect(() => {
    if (messages.length) {
      showMany();
      dispatchClearMessage(dispatch);
    }
  });

  function showMany() {
    growl.current.show(messages);
  }

  dialogSuccess = function showSuccess(message) {
    growl.current.show({ severity: 'success', summary: 'Success', detail: message });
  };

  // function showSuccessMany() {
  //   growl.current.show(success.map(message => {
  //     return { severity: 'success', summary: 'Success', detail: message }
  //   }));
  // }

  dialogError = function showError(message) {
    growl.current.show({ severity: 'error', summary: 'Error', detail: message });
  };

  // function showErrorMany() {
  //   growl.current.show(error.map(message => {
  //     return { severity: 'error', summary: 'Error', detail: message }
  //   }));
  // }

  return (
    <Growl ref={growl} position="bottomright" />
  );
}

export default Message;
