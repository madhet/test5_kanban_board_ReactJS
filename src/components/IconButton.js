import React from 'react'
import AcceptIcon from '../images/md-checkmark-circle-outline.svg'
import CancelIcon from '../images/md-close-circle-outline.svg'
// import DeleteIcon from '../images/md-trash.svg'


export default function IconButton(props) {

  const { type, className, onClick } = props;

  let iconPath = '', altText = '';

  switch (type) {
    case 'ACCEPT': {
      iconPath = AcceptIcon;
      altText = 'yes';
      break;
    }
    case 'CANCEL': {
      iconPath = CancelIcon;
      altText = 'no';
      break;
    }
    case 'DELETE': {
      iconPath = CancelIcon;
      altText = 'delete';
      break;
    }
    default:
      break;
  }

  return (
    <button className={`icon-button ${className || ''}`} onClick={onClick}>
      <img src={iconPath} alt={altText} />
    </button>
  )
}
