import React, { useState, useContext, useEffect } from 'react';
import alertContext from '../../context/alert/alertContext';
import authContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
export const Login = (props) => {
  const AlertContext = useContext(alertContext);
  const AuthContext = useContext(authContext);
  const navigate = useNavigate();

  const { setAlert } = AlertContext;
  const { login, error, clearErrors, isAuthenticated } = AuthContext;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          ></input>
        </div>

        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        ></input>
      </form>
    </div>
  );
};
