
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
// import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <ul className='navBar_ul'>
        <li>
          <NavLink className='navBarHome' to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className='navBarLogin' to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink className='navBarSignUp' to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink className='navBarUsers' to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          < LogoutButton to='/' exact={true} />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
