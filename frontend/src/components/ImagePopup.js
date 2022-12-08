function ImagePopup({ onClose, card, handleOverlay }) {
  return (
    <div
      onClick={handleOverlay}
      className={`popup popup_popup_image  ${card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__overlay popup__overlay_image">
        <img
          src={card.link}
          alt={`увеличенное изображение ${card.name}`}
          className="popup__increased"
        />
        <p className="popup__caption">{card.name}</p>
        <button
          type="button"
          className="popup__close popup__close_image"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
