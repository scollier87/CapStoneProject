import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SignUpForm from '../auth/SignUpForm.js';
import LoginForm from '../auth/LoginForm.js';
import './splashPage.css'

function SplashPage() {

    <></>


    return(
        <>

         <div className='spl_container'>
             {/* <LogoutButton to='/login'/> */}
             <div className='middle_div'>
            <div className='spl_containerLeft'>
                <div className='spl_containerLeftImg'>
                    <h3 className='h3_tag'>Sign Up</h3>
                    <SignUpForm/>
                </div>
            </div>
            <div className='canva'></div>
            <div className='spl_containerRight'>
                {/* <div className='spl_containerRightImg'> */}
                    <h3 className='h3_tags'>Log In</h3>
                    <LoginForm/>
                {/* </div> */}
            </div>
            </div>
            {/* <h3>Popular Articles</h3> */}
            <div className='spl_newsFeed'>
            <div className='bunchOfh3s'>
                <h3>Infants Ages 0-1</h3>
                <h3>Toddlers Ages 1-2</h3>
                <h3>Toddlers Ages 2-3</h3>
            </div>
            <div className='newsFeedDiv_Container'>
            <a href='https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/infants.html' target='_blank'><div className='spl_newsFeedDiv1'></div></a>
            <a href='https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/toddlers.html' target='_blank'><div className='spl_newsFeedDiv2'></div></a>
            <a href='https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/toddlers.html' target='_blank'><div className='spl_newsFeedDiv3'></div></a>
            </div>
            </div>
            <div className='spl_Footer'>
            <a href='https://github.com/scollier87' target='_blank'><img className='spl_About' src="https://img.icons8.com/ios/50/000000/github--v1.png" alt="GithubImage"/></a>
            <h3>Created by Sean Collier</h3>
            <a href='https://www.linkedin.com/in/sean-collier-65b32412b/' target='_blank'><img className='spl_About' src="https://img.icons8.com/ios/50/000000/linkedin.png" alt="LinkedinImage"/></a>

            </div>
        </div>

        </>
    )

};

export default SplashPage;