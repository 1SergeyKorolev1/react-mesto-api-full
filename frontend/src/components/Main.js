import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CardsContext } from "../contexts/CardsContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const currentCards = React.useContext(CardsContext);
  function handleCardLike(card) {
    props.onClickingOnLike(card);
  }

  function handleCardDelete(card) {
    props.onDeletCard(card);
  }

  //console.log(currentUser);

  return (
    <main className="content">
      <section className="profile">
        <img
          src={currentUser.data.avatar}
          alt={currentUser.data.name}
          className="profile__avatar"
          title="аватар"
        />
        <button
          type="button"
          className="profile__edit-avatar"
          onClick={props.onEditAvatar}
        ></button>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__title">{currentUser.data.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.data.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {currentCards.map((card) => (
          <Card
            card={card}
            onCardClick={props.handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            key={card._id}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
