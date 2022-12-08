import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  onLoading,
  handleOverlay,
}) {
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    //console.log(currentUser);
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function onNameChange(evt) {
    setName(evt.target.value);
    //console.log(evt.target.value);
  }

  function onDescriptionChange(evt) {
    setDescription(evt.target.value);
    //console.log(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      handleOverlay={handleOverlay}
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}
      nameAttribute="form-edit-profile"
      name="profile"
      title="Редактировать провиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            className="popup__nameinput view-input"
            placeholder="Введите имя"
            value={name ?? ""}
            onChange={onNameChange}
            name="firstname"
            id="text-input"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__error" id="text-input-error"></span>
          <input
            type="text"
            className="popup__jobinput view-input"
            placeholder="Введите профессию"
            value={description ?? ""}
            onChange={onDescriptionChange}
            name="lastname"
            id="lastText-input"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__error" id="lastText-input-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
