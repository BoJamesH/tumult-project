import React from 'react';
import { useModal } from '../../context/Modal';
import './openModalButton.css'

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  buttonStyle,
  buttonImgSrc
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };


  return (
    <>
    {!buttonImgSrc ? (
    <button className={buttonStyle} onClick={onClick}>{buttonText}</button>
    ) : <img src={buttonImgSrc} alt='update server icon' className='button-icon' onClick={onClick} />}
    </>
  );
}

export default OpenModalButton;
