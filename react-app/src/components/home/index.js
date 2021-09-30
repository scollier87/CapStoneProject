import './home.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import LogoutButton from '../auth/LogoutButton'
import { getEvents } from '../../store/event'
import { getBookings } from '../../store/booking'

function Home() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const events = useSelector((state) => Object.values(state.event))
    // const event = useSelector((state) => Object.values(state.events))
    const bookings = useSelector((state) => Object.values(state.booking))
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users)
        }
        fetchData();
    }, []);

    useEffect(() => {
        dispatch(getEvents());
        dispatch(getBookings());
    }, [dispatch])

    const fetchUserTable = (id) => {
        const user = users?.filter((user) => (user.id === id))
        const [userObj] = user
        return userObj
    }

    const filteredEvents = events.filter((event) => event.owner_id !== sessionUser?.id);
    const filteredBookings = bookings.filter(booking => booking.owner_id === sessionUser?.id)

    return (
        <div className='hm_backgroundOuter'>
            <>
            <LogoutButton/>
            <div className='hm_header'>
                <Link to={`./eventsuser`} className='hm_myEventsButton'>My Events</Link>
            </div>
            <div >
                <Link to={`./events`} className='hm_createEventButton'>Create an Event</Link>
            </div>
            <div>
                <Link to={'./'} className='hm_spl'>Front Page</Link>
            </div>
            <div className='hm_myCreatedEventsContainer'>
                <div>
                    {filteredEvents.map((event) =>
                        <div className='hm_createdEventsBorder'>
                            <li className='hm_createdEvents'>Time of Event: {event.event_time}</li>
                            <li className='hm_createdEvents'>Number of Children: {event.how_many_kids}</li>
                            <li className='hm_createdEvents'>Description: {event.description}</li>
                            <li className='hm_createdEvents'>How much? ${event.cost}/hr</li>
                            <a className="bookEvent_button" href={`/bookings/${event.id}`}> Book Event? </a>
                        </div>
                    )}
                </div>
            </div>
                <h1 className='tellMore'>Tell us about yourself and your children</h1>
            <div className='hm_bioDiv'>
                <h1>Hello Everyone, I am looking for a babysitter for at least once a week for a couple hours session.
                    I have three amazing babies. Addison who is three years old, James who is 2 years old and Charlotte who
                    is 9 months of age. Any help would be greatly appreciated!
                </h1>
            </div>
            <div className='hm_myCreatedBookingsContainer'>
                <div>
                    {filteredBookings.map((booking) =>
                        <div className='hm_createBookingsBorder'>
                            <li className='hm_createdBookings'>Who Created the event: {`${fetchUserTable(booking?.events[0]?.owner_id)?.first_name} ${fetchUserTable(booking?.events[0]?.owner_id)?.last_name}`}</li>
                            <li className='hm_createdBookings'>Time of Event: {booking?.events[0]?.event_time}</li>
                            <li className='hm_createdBookings'>Event Cost: ${booking?.events[0]?.cost}/hr</li>
                            <li className='hm_createdBookings'></li>
                        </div>
                    )}
                    <Link to={`/bookingsuser`} className='hm_myBookingsButton'>My Bookings</Link>
                </div>
            </div>
            <div className='hm_images'>
                <div className='hm_imagesDiv'></div>
                <div className='hm_imagesDiv1'>Images1</div>
            </div>
            </>
        </div>
    )
}

export default Home;