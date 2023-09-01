import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

function Login() {
  const { user, setUser } = useLocalStorage();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setUser({ email: '' });
  }, [setUser]);

  const handleValidateForm = (
    userInfo: { email: string; password: string },
  ) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const isEmailValid = emailRegex.test(userInfo.email);
    const isPasswordValid = userInfo.password.length > 6;

    if (isEmailValid && isPasswordValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <main
      className="container-fluid d-flex h-100
      flex-column justify-content-center align-items-center p-0"
    >
      <div
        className="d-flex justify-content-center
        align-items-start h-100 w-100 bg-primary pt-4"
      >
        <img
          className="w-50"
          src="/src/images/logo.svg"
          alt="Logo Svg"
        />
      </div>
      <img
        className="w-100 position-absolute top-25 end-25 d-md-none"
        src="/src/images/tomate.svg"
        alt="Tomate"
      />
      <form
        className="h-100"
        onSubmit={ (e) => {
          e.preventDefault();
          navigate('/meals');
        } }
      >
        <h1>Login</h1>

        <label htmlFor="email">
          <input
            value={ user.email }
            data-testid="email-input"
            id="email"
            type="email"
            placeholder="Email"
            onChange={ (e) => {
              setUser((prevUser) => ({ ...prevUser, email: e.target.value }));
              handleValidateForm({ email: e.target.value, password });
            } }
          />
        </label>

        <label htmlFor="password">
          <input
            value={ password }
            data-testid="password-input"
            id="password"
            type="password"
            placeholder="Password"
            onChange={ (e) => {
              setPassword(e.target.value);
              handleValidateForm({ email: user.email, password: e.target.value });
            } }
          />
        </label>

        <button
          disabled={ isDisabled }
          type="submit"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </main>
  );
}

export default Login;
