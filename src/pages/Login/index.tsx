import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

function Login() {
  const navigate = useNavigate();
  const { setUser } = useLocalStorage();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const handleValidateForm = (
    userInfo: { email: string; password: string },
  ) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const isEmailValid = emailRegex.test(userInfo.email);
    const isPasswordValid = userInfo.password.length > 5;

    if (isEmailValid && isPasswordValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        setUser({ email: userData.email });
        navigate('/meals');
      } }
    >
      <h1>Login</h1>

      <label htmlFor="email">
        <input
          value={ userData.email }
          data-testid="email-input"
          id="email"
          type="email"
          placeholder="Email"
          onChange={ (e) => {
            setUserData((prevUserData) => ({ ...prevUserData, email: e.target.value }));
            handleValidateForm({ ...userData, email: e.target.value });
          } }
        />
      </label>

      <label htmlFor="password">
        <input
          value={ userData.password }
          data-testid="password-input"
          id="password"
          type="password"
          placeholder="Password"
          onChange={ (e) => {
            setUserData((prevUserData) => (
              { ...prevUserData, password: e.target.value }));
            handleValidateForm({ ...userData, password: e.target.value });
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
  );
}

export default Login;
