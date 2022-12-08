import React from "react";

function PopupWithForm(props) {
  return (
    <div
      onClick={props.handleOverlay}
      className={`popup popup_popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__overlay">
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.nameAttribute}
          className={`popup__form popup__form_${props.name}`}
          onSubmit={props.onSubmit}
          // noValidate
        >
          {props.children}
          <button type="submit" className="popup__submit">
            {props.buttonText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
