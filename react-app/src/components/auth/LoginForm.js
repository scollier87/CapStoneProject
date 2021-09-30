import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

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

  const demoUserLogin = () => {
    const data = dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data)
    }
  }

  if (user) {
    return <Redirect to='/home' />;
  }

  const currentErrors = Object.values(errors)

  return (
    <div className='loginButton_form'>
    <form onSubmit={onLogin}>
      <div>
        {currentErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label className='loginButton_formLabel' htmlFor='email'>Email</label>
        <input
          className='loginButton_formInput'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label className='loginButton_formLabel' htmlFor='password'>Password</label>
        <input
          className='loginButton_formInput'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button className='LoginButton_formBtn' type='submit'>Login</button>
      </div>
      <div className='demoBtn'><a onClick={demoUserLogin}>Demo User</a></div>
    </form>
    </div>
  );
};

export default LoginForm;
