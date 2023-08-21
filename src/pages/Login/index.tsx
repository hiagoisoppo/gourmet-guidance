import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

function Login() {
  const { setUser } = useLocalStorage();
  const [inputUser, setInputUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        setUser({ email: inputUser });
      } }
    >
      <h1>Login</h1>

      <label htmlFor="email">
        <input
          value={ inputUser }
          data-testid="email-input"
          id="email"
          type="email"
          placeholder="Email"
          onChange={ (e) => setInputUser(e.target.value) }
        />
      </label>

      <label htmlFor="data">
        <input
          value={ password }
          data-testid="password-input"
          id="password"
          type="password"
          placeholder="Password"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
