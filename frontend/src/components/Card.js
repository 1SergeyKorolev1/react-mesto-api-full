import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${isOwn ? "element__basket" : "element__bascet_disabled"
    }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  //console.log(isLiked);
  const cardLikeButtonClassName = `element__like ${isLiked ? "element__like_active" : ""
    }`;

  return (
    <div className="element">
      <img
        className="element__img"
        src={card.link}
        onClick={handleClick}
        alt={card.name}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-group">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
