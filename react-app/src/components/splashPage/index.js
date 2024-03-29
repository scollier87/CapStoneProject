import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SignUpForm from '../auth/SignUpForm.js';
import LoginForm from '../auth/LoginForm.js';
import './splashPage.css'
import { useState } from 'react';

function SplashPage() {

    let [authForm, setAuthForm] = useState('Signup');


    const toggleForm = e => authForm === 'Signup' ? setAuthForm('Login') : setAuthForm('Signup')



    return(
        <>

        <div className='spl_container'>

            <div id='splashBanner'>
                <div className='canva'></div>
                <div className='formContainer'>
                    {/* form */}
                    <h3 className='h3_tag'>{authForm}</h3>
                    {authForm === 'Signup' ? <SignUpForm/> : <LoginForm/>}
                    <button id='toggleAuthBttn' onClick={toggleForm}>{authForm === 'Signup' ? 'Login' : 'Signup'}</button>
                </div>
            </div>

            <div className='newsFeedDiv_Container'>
                <a href='https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/infants.html' target='blank'><div className='spl_newsFeedDiv1'></div>Infants Ages 0-1</a>
                <a href='https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/toddlers.html' target='blank'><div className='spl_newsFeedDiv2'></div>Toddlers Ages 1-2</a>
                <a href='https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/toddlers.html' target='blank'><div className='spl_newsFeedDiv3'></div>Toddlers Ages 2-3</a>
            </div>




            <div className='spl_Footer'>
                <a href='https://github.com/scollier87' target='blank'><img className='spl_About' src="https://img.icons8.com/ios/50/000000/github--v1.png" alt="GithubImage"/></a>
                <h3>Created by Sean Collier</h3>
                <a href='https://www.linkedin.com/in/sean-collier-65b32412b/' target='blank'><img className='spl_About' src="https://img.icons8.com/ios/50/000000/linkedin.png" alt="LinkedinImage"/></a>
            </div>
        </div>

        </>
    )

};

export default SplashPage;