import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
  isOpen,
  onClose,
  onAddCard,
  isLoading,
}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const [linkValidationMessage, setLinkValidationMessage] = useState('');

  useEffect(() => {
    setName('');
    setIsNameValid(false);
    setNameValidationMessage('');
    setLink('');
    setIsLinkValid(false);
    setLinkValidationMessage('');
  }, [isOpen]);

  function handleNameInput(evt) {
    const { value, validity, validationMessage } = evt.target;

    setName(value);
    setIsNameValid(validity.valid);
    setNameValidationMessage(validationMessage);
  }

  function handleLinkInput(evt) {
    const { value, validity, validationMessage } = evt.target;

    setLink(value);
    setIsLinkValid(validity.valid);
    setLinkValidationMessage(validationMessage);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText="Create"
      buttonLoadingText="Creating..."
      isButtonDisabled={!(isNameValid && isLinkValid)}
    >
      <input
        id="name-picture-input"
        className={`popup__input ${
          nameValidationMessage? 'popup__input_type_error' : ''
        }`}
        type="text"
        name="name"
        placeholder="Name"
        required
        minLength="2"
        maxLength="30"
        onChange={handleNameInput}
        value={name}
      />
      <span
        className="popup__error"
      >
        {nameValidationMessage}
      </span>
      <input
        id="link-input"
        className={`popup__input ${
          linkValidationMessage? 'popup__input_type_error' : ''
        }`}
        type="url"
        name="link"
        placeholder="Image link"
        required
        onChange={handleLinkInput}
        value={link}
      />
      <span
        className="popup__error"
      >
        {linkValidationMessage}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
