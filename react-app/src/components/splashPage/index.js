import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './splashPage.css'

function SplashPage() {
    <></>


    return(
        <>
        <LogoutButton to='/login'/>
        <div className='spl_container'>
            <div className='spl_containerLeft'>
                <div className='spl_containerLeftImg'>

                </div>
            </div>
            <div className='spl_containerRight'>
                <div className='spl_containerRightImg'>

                </div>
            </div>
            <div className='spl_newsFeed'>

            </div>
            <div className='spl_Footer'>

            </div>
        </div>

        </>
    )

};

export default SplashPage;