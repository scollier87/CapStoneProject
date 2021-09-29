import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    let temporaryErrors = {...errors}
    let correctEmail = []
    let splitEmail = email.split('')
    for (let characters in splitEmail){
      let character = splitEmail[characters]

        if(character === "@"){
          correctEmail.push(true)
        }

        if(character === '.'){
          correctEmail.push(true)
        }

    }
    if(correctEmail.length < 2){
      temporaryErrors.email = 'Must be a valid email'
      setErrors(temporaryErrors)
    } else {
      delete temporaryErrors.email
      setErrors(temporaryErrors)
    }
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    let temporaryErrors = {...errors}
    if(e.target.value < 1) {
      temporaryErrors.password = 'Must enter a password'
      setErrors(temporaryErrors)
    } else {
      delete temporaryErrors.password
      setErrors(temporaryErrors)
    }
  };


  if (user) {
    return <Redirect to='/home' />;
  }

  const currentErrors = Object.values(errors)

  return (
    <form onSubmit={onLogin}>
      <div>
        {currentErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
