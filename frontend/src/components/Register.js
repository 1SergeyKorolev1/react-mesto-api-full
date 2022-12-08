import React from "react";
import { Link } from "react-router-dom";

function Register({ onAddUser }) {
  const [password, setPassword] = React.useState("");
  const [link, setLink] = React.useState("");

  function onChangePassword(evt) {
    setPassword(evt.target.value);
    // console.log(evt.target.value);
  }

  function onChangeLink(evt) {
    setLink(evt.target.value);
    // console.log(evt.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddUser({
      name: password,
      about: link,
    });
  };

  return (
    <div className="login">
      <p className="login__welcome">Регистраия</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          id="password-register"
          required
          name="login-password"
          type="password"
          placeholder="Парорль"
          value={password}
          onChange={onChangePassword}
        />
        {/* <label htmlFor="password">Пароль:</label> */}
        <input
          className="login__input"
          id="email-register"
          required
          name="login-email"
          type="email"
          placeholder="Email"
          value={link}
          onChange={onChangeLink}
        />
        <button type="submit" className="login__link">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="login__link-register">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
