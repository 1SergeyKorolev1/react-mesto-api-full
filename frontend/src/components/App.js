import { api } from "../utils/api.js";
import { auth } from "../utils/auth.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Register from "./Register.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import React from "react";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CardsContext } from "../contexts/CardsContext.js";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [currentCards, setCurrentCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ email: '', _id: '', name: '', avatar: '' });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isStatusPopupOpen, setIsStatusPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [error, setError] = React.useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link ||
    isStatusPopupOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  const handleOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  // setTimeout(() => {
  //   console.log(loggedIn);
  // }, "2000");
  //console.log(localStorage.jwt);

  React.useEffect(() => {
    api
      .initialDataProfile()
      .then((data) => {
        setCurrentUser(data);
        //console.log(data);
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }, [loggedIn]);

  React.useEffect(() => {
    api
      .initialCardsData()
      .then((data) => {
        setCurrentCards(data);
        //console.log(data);
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }, [loggedIn]);

  const authCheck = (jwt) => {
    auth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserData({
            userId: res._id,
            email: res.email,
            avatar: res.avatar,
            name: res.name,
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authCheck(jwt);
    }
  }, [loggedIn]);

  function handleNewCards(data) {
    setIsLoading(true);
    //console.log(data);
    api
      .sendCardData(data.name, data.link)
      .then((res) => {
        setCurrentCards([res, ...currentCards]);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .nameAndJobValues(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        //console.log(res);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }

  function handleAuthorizedUser(data) {
    return auth
      .onAuthorize(data.name, data.about)
      .then((res) => {
        //setLoggedIn(true);
        // console.log('tok', res.token);
        if (res.token) {
          // setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          authCheck(res.token)
          // console.log(loggedIn);
          // console.log(localStorage);
          // Redirect("/");
        } else {
          console.log("У вас нет токена!");
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }

  function handleAddUser(data) {
    auth
      .onRegister(data.name, data.about)
      .then((res) => {
        //console.log(res);
        if (!res) {
          setError(true);
          setIsStatusPopupOpen(true);
        } else {
          setError(false);
          setIsStatusPopupOpen(true);
          history.push("/sign-in");
          return res;
        }
      })
      .catch((err) => {
        setError(true);
        setIsStatusPopupOpen(true);
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .sendAvatarData(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsStatusPopupOpen(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    //console.log(card);
  }

  function signOut() {
    setLoggedIn(false);
    setUserData({});
    setCurrentUser({});
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  function onDeletCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCurrentCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }

  function onClickingOnLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    //console.log(card.likes.some((i) => i._id === currentUser._id));
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // console.log(currentUser.data._id);
    //console.log(isLiked);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCurrentCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
        // setTimeout(() => {
        //   console.log(currentCards);
        // }, "2000");
      })
      .catch((err) => {
        console.log(`Ошибка ${err} повторите запросс позже`);
      });
  }
  
  return (
    <CardsContext.Provider value={currentCards}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header signOut={signOut} userData={userData} />
        {loggedIn && <ProtectedRoute
          path="/"
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={handleCardClick}
          onClickingOnLike={onClickingOnLike}
          onDeletCard={onDeletCard}
          loggedIn={loggedIn}
          component={Main}
        />}
        <ProtectedRoute path="/" loggedIn={loggedIn} component={Footer} />
        <Switch>
          <Route path="/sign-in">
            <Login onAuthorizedUser={handleAuthorizedUser} />
          </Route>
          <Route path="/sign-up">
            <Register onAddUser={handleAddUser} />
          </Route>
        </Switch>

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          handleOverlay={handleOverlay}
        />
        <EditAvatarPopup
          handleOverlay={handleOverlay}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <EditProfilePopup
          handleOverlay={handleOverlay}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <AddPlacePopup
          handleOverlay={handleOverlay}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleNewCards}
          onLoading={isLoading}
        />
        <InfoTooltip
          handleOverlay={handleOverlay}
          isOpen={isStatusPopupOpen}
          onClose={closeAllPopups}
          error={error}
        />
      </CurrentUserContext.Provider>
    </CardsContext.Provider>
  );
}

export default App;
