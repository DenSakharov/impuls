import React from 'react';
import './loginPage.css';
import "./bootstrap.min.css";

function loginPage() {
  return (
    <form action="http://localhost:3000/main" className="form-signin">
      <img src='./img/logo.png' className="App-logo1" alt="logo"
        width="100"
        height="100"
      />

      <h1 className="h3 mb-3 font-weight-normal">Авторизация </h1>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>

      <input
        type="email"
        id="inputEmail"
        className="form-control"
        placeholder="Email address"
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
      />
      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Войти
      </button>
      <p className="mt-5 mb-3 text-muted">© Impuls Teem 2024</p>
    </form>
  );
}

export default loginPage;
