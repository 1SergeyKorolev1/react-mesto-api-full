import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  onLoading,
  handleOverlay,
}) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function onNameChange(evt) {
    setName(evt.target.value);
    //console.log(evt.target.value);
  }

  function onDescriptionChange(evt) {
    setLink(evt.target.value);
    //console.log(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      handleOverlay={handleOverlay}
      buttonText={onLoading ? "Сохранение..." : "Создать"}
      nameAttribute="form-add-card"
      name="mesto"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            className="popup__nameinput popup__nameinput_mesto view-input"
            name="firstname"
            placeholder="Название"
            onChange={onNameChange}
            value={name || ""}
            id="designation-input"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__error" id="designation-input-error"></span>
          <input
            type="url"
            className="popup__jobinput popup__jobinput_mesto view-input"
            name="lastname"
            onChange={onDescriptionChange}
            value={link || ""}
            placeholder="Ссылка на картинку"
            id="url-input"
            required
          />
          <span className="popup__error" id="url-input-error"></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
