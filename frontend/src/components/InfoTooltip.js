import React from "react";
import statusLogo from "../images/Union.svg";
import statusLogoError from "../images/UnionError.svg";

function InfoTooltip({ isOpen, onClose, error, handleOverlay }) {
  return (
    <div
      onClick={handleOverlay}
      className={`popup ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__overlay">
        {error ? (
          <img
            src={statusLogoError}
            alt="Ошибка регистраии (красный крестик в кружочке)"
            className="popup__image"
          />
        ) : (
          <img
            src={statusLogo}
            alt="Успешная регистрация (зеленая галочка в кружочке)"
            className="popup__image"
          />
        )}

        <h2 className="popup__title popup__title_status">
          {error
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </h2>
        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
