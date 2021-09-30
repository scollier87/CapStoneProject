import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../store/session';
import './LogOutButton.css'

const LogoutButton = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.sessionUser)
  const onLogout = async (e) => {
    await dispatch(logout());
    if(!sessionUser){
      history.push('/')
    }
  };

  return <button className='LogOutButtonMain' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;