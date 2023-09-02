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
      className="container-fluid d-flex h-100 bg-secondary
      flex-column justify-content-end align-items-center p-0"
    >
      <form
        className="d-flex flex-column justify-content-center position-relative
        align-items-center h-75 w-100 bg-tertiary pt-4 rounded-3 shadow-lg"
        onSubmit={ (e) => {
          e.preventDefault();
          navigate('/meals');
        } }
      >
        <img
          className="w-50 position-absolute bottom-75"
          src="/src/images/logo.svg"
          alt="Logo Svg"
        />
        <div className="form-group d-flex flex-column align-items-center">
          <h1 className="display-4 m-4">Login</h1>

          <label htmlFor="email" className="m-1 w-100">
            <input
              className="form-control bg-secondary p-2"
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

          <label htmlFor="password" className="m-1 w-100">
            <input
              className="form-control bg-secondary p-2"
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
            className="btn btn-primary m-2 w-100 p-2"
            disabled={ isDisabled }
            type="submit"
            data-testid="login-submit-btn"
          >
            Enter
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
