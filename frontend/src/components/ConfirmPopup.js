import PopupWithForm from './PopupWithForm';

function ConfirmPopup({
  isOpen,
  onClose,
  onCardDelete,
  isLoading
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Are you sure?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText="Yes"
      buttonLoadingText ="Deleting..."
      isButtonDisabled={false}
    />
  );
}

export default ConfirmPopup;
