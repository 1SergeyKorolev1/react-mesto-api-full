import React from "react";
import logoMesto from "../images/logo_mesto_Russia.png";
import { Route, Switch, Link, Redirect } from "react-router-dom";

function Header({ signOut, userData }) {
  return (
    <header className="header">
      <img
        src={logoMesto}
        className="header__logo"
        alt="лого-Место-Россия"
        title="лого-Место"
      />
      <div className="header__line"></div>
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__email">{userData.email}</p>
            <a onClick={signOut} className="header__link">
              Выйти
            </a>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
