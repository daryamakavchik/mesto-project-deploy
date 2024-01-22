import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  };

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!email || !password) {
      return;
    }

    onRegister({
      email,
      password
    });
  };

  return (
    <section className="auth">
        <h1 className="auth__title">Sign up</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            onChange={handleEmailInput}
            className="auth__input"
            name="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            type="email"
            required
          ></input>
          <input
            onChange={handlePasswordInput}
            className="auth__input"
            name="password"
            placeholder="Password"
            autoComplete="off"
            type="password"
            value={password}
            required
          ></input>
          <button className="button auth__button-submit" type="submit">
            Sign up
          </button>
          <div className="auth__container">
            <p className="auth__question">
              Already registered?&nbsp;
              <Link to="/signin" className="auth__link">
                Sign in
              </Link>
            </p>
          </div>
        </form>
    </section>
  );
}

export default Register;
