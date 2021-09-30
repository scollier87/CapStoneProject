import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, first_name, last_name, email, password));
      if (data) {
        setErrors(data)
        console.log(errors)
      }
    }
  };


  const updateUsername = (e) => {
    setUsername(e.target.value);
    let temporaryErrors = {...errors}
      if(e.target.value === '' || e.target.value === ' '){
        temporaryErrors.username = 'Must provide username'
        setErrors(temporaryErrors)
      } else {
        delete temporaryErrors.username
        setErrors(temporaryErrors)
      }
  };

  const updateFirst_name = (e) => {
    setFirst_name(e.target.value)
    let temporaryErrors = {...errors}
    if(e.target.value === '' || e.target.value === ' ') {
      temporaryErrors.first_name = 'Must provide a first name'
      setErrors(temporaryErrors)
    } else {
      delete temporaryErrors.first_name
      setErrors(temporaryErrors)
    }
  }

  const updateLast_name = (e) => {
    setLast_name(e.target.value)
    let temporaryErrors = {...errors}
    if(e.target.value === '' || e.target.value === ' ') {
      temporaryErrors.last_name = 'Must provide a Last name'
      setErrors(temporaryErrors)
    } else {
      delete temporaryErrors.last_name
      setErrors(temporaryErrors)
    }
  }

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

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    let temporaryErrors = {...errors}
    if(e.target.value!==password) {
      temporaryErrors.repeatPassword = 'Passwords must match'
      setErrors(temporaryErrors)
    } else {
      delete temporaryErrors.repeatPassword
      setErrors(temporaryErrors)
    }
  };


  if (user) {
    return <Redirect to='/' />;
  }

  const currentErrors = Object.values(errors)
  console.log(username)
  return (
    <div className='submitButton_form'>
    <form onSubmit={onSignUp}>
      <div>
        {currentErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label className='submitButton_formLabel'>User Name</label>
        <input
          className='submitButton_formInput'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label className='submitButton_formLabel'>First Name</label>
        <input
          className='submitButton_formInput'
          type='text'
          name="first_name"
          onChange={updateFirst_name}
          value={first_name}
        ></input>
      </div>
      <div>
        <label className='submitButton_formLabel'>Last Name</label>
        <input
          className='submitButton_formInput'
          type='text'
          name="last_name"
          onChange={updateLast_name}
          value={last_name}
        ></input>
      </div>
      <div>
        <label className='submitButton_formLabel'>Email</label>
        <input
          className='submitButton_formInput'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label className='submitButton_formLabel'>Password</label>
        <input
          className='submitButton_formInput'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label className='submitButton_formLabel'>Repeat Password</label>
        <input
          className='submitButton_formInput'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className='submitForm_signup' type='submit'>Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpForm;
