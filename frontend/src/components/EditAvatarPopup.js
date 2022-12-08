import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  onLoading,
  handleOverlay,
}) {
  const textInput = React.useRef();

  React.useEffect(() => {
    textInput.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: textInput.current.value,
    });
  }

  return (
    <PopupWithForm
      handleOverlay={handleOverlay}
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}
      nameAttribute="form-edit-avatar"
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="url"
            className="popup__jobinput popup__jobinput_avatar view-input"
            name="lastname"
            defaultValue=""
            placeholder="Введите url изображения"
            ref={textInput}
            id="url-avatar"
            required
          />
          <span className="popup__error" id="url-avatar-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
