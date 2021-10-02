
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
// import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <div className='navBar_Div'>
        <div>
          <NavLink className='navBarHome' to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink className='navBarLogin' to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink className='navBarSignUp' to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        <div>
          <NavLink className='navBarUsers' to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div>
          < LogoutButton to='/' exact={true} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
