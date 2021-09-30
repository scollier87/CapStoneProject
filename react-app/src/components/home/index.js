import './home.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import LogoutButton from '../auth/LogoutButton'
import { getEvents } from '../../store/event'
import { getBookings, deleteBooking } from '../../store/booking'
// import { handleSubmit } from '../booking_createForm/index'

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

    const handleDelete = (id) => {
        dispatch(deleteBooking(id))
    }

    const fetchUserTable = (id) => {
        const user = users?.filter((user) => (user.id === id))
        const [userObj] = user
        return userObj
    }

    const filteredEvents = events.filter((event) => event.owner_id !== sessionUser?.id);
    // const filteredBookings = bookings.filter(booking => booking.owner_id !== sessionUser?.id)

    let wages = (hourlyRate, lengthOfEvent) => {
        return (hourlyRate * lengthOfEvent)
    }

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
            <h1 className='CurrentEventsTag'>Current Events</h1>
            <div className='hm_myCreatedEventsContainer'>
                <div>
                    <div>
                    {filteredEvents.map((event) =>
                        <div className='hm_createdEventsBorder'>
                            <li className='hm_createdEvents'><strong>Time of Event:</strong> {event.event_time}</li>
                            <li className='hm_createdEvents'>How many hours: {event.duration}</li>
                            <li className='hm_createdEvents'>Number of Children: {event.how_many_kids}</li>
                            <li className='hm_createdEvents'>Description: {event.description}</li>
                            <li className='hm_createdEvents'>How much? ${event.cost}/hr</li>
                            <a className="bookEvent_button" href={`/bookings/${event.id}`}> Book Event? </a>
                            {/* <button className="bookEvent_button" onClick={() =>handleSubmit(event?.id)}> Book Event? </button> */}
                        </div>
                    )}
                    </div>
                </div>
            </div>
                <h1 className='tellMore'>Welcome to Babysitting Needs {sessionUser.first_name}</h1>
            <div className='hm_bioDiv'>
                <h1>Hello Everyone, if you are a parent, start creating your
                    events. If you are a babysitter, start booking and making
                    money. Or do both!
                </h1>
            </div>
            <h1 className='babysittingEventsTag'>My Babysitting Events</h1>
            <div className='hm_myCreatedBookingsContainer'>
                <div>
                    <div>
                    {bookings.map((booking) =>
                        <div className='hm_createBookingsBorder'>
                            <li className='hm_createdBookings'><strong>Parent:</strong> {`${fetchUserTable(booking?.events[0]?.owner_id)?.first_name} ${fetchUserTable(booking?.events[0]?.owner_id)?.last_name}`}</li>
                            <li className='hm_createdBookings'><strong>Babysitter:</strong> {booking?.first_name} {booking?.last_name} </li>
                            <li className='hm_createdBookings'><strong>Time of Event:</strong> {booking?.events[0]?.event_time}</li>
                            <li className='hm_createdBookings'><strong>I am being paid</strong> ${wages(booking?.events[0]?.cost, booking?.events[0]?.duration)}</li>
                            <li className='hm_createdBookings'></li>
                            {sessionUser?.id === booking?.owner_id && <button className='faviconTrash' onClick={()=>handleDelete(booking?.id)}><img src="https://img.icons8.com/small/16/000000/trash--v1.png"/></button>}
                        </div>
                    )}
                    </div>
                    {/* <Link to={`/bookingsuser`} className='hm_myBookingsButton'>My Bookings</Link> */}
                </div>
            </div>
            {/* <div className='hm_images'>
                <div className='hm_imagesDiv'></div>
                <div className='hm_imagesDiv1'>Images1</div>
            </div> */}
            </>
        </div>
    )
}

export default Home;