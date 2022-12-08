import React from "react";
import { Link } from "react-router-dom";

function Login({ onAuthorizedUser }) {
  const [password, setPassword] = React.useState("");
  const [link, setLink] = React.useState("");

  function onChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function onChangeLink(evt) {
    setLink(evt.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAuthorizedUser({
      name: password,
      about: link,
    });
  };
  return (
    <div className="login">
      <p className="login__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          id="password"
          required
          name="login-password"
          type="password"
          placeholder="Парорль"
          value={password}
          onChange={onChangePassword}
        />
        <input
          className="login__input"
          id="email"
          required
          name="login-email"
          type="email"
          placeholder="Email"
          value={link}
          onChange={onChangeLink}
        />
        <button type="submit" className="login__link">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
