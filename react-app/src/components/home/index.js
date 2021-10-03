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
    const event = useSelector((state) => (state?.event))
    const bookings = useSelector((state) => Object.values(state?.booking))
    const [users, setUsers] = useState([]);
    console.log(event)
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users)
        }
        fetchData();
    }, []);

    useEffect(() => {
        dispatch(getBookings());
        dispatch(getEvents());
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
    const filteredBookings = bookings.filter((booking) => booking?.owner_id !== sessionUser?.id);

    let wages = (hourlyRate, lengthOfEvent) => {
        // console.log(hourlyRate, lengthOfEvent)
        return (hourlyRate * lengthOfEvent)
    }


    const isEventOpen = (event => {
        for(let booking of bookings) {
            if(booking.event_id === event.id){
                return true
            }
        }
        return false
    })

    return (
        <div className='hm_backgroundOuter'>
            <>
            <div className='hm_header'>
                <Link to={`./eventsuser`} className='hm_myEventsButton'>My Events</Link>
                <Link to={`./events`} className='hm_createEventButton'>Create an Event</Link>
                <LogoutButton/>
            </div>
            <h1 className='CurrentEventsTag'>Current Events</h1>
            <div className='hm_myCreatedEventsContainer'>
                <div>
                    <div>
                    {filteredEvents.map((event) =>
                        <div className='hm_createdEventsBorder'>
                            <li className='hm_createdEvents'><strong>Parent:</strong>{`${fetchUserTable(event?.owner_id)?.first_name} ${fetchUserTable(event?.owner_id)?.last_name}`}</li>
                            <li className='hm_createdEvents'><strong>Time of Event:</strong> {event.event_time}</li>
                            <li className='hm_createdEvents'><strong>How many hours:</strong> {event.duration}</li>
                            <li className='hm_createdEvents'><strong>Number of Children:</strong>{event.how_many_kids}</li>
                            <li className='hm_createdEvents'><strong>Description:</strong>{event.description}</li>
                            <li className='hm_createdEvents'><strong>How much? ${event.cost}/hr</strong></li>
                            {!isEventOpen(event) ? <Link className="bookEvent_button" to={`/bookings/${event.id}`}> Book Event? </Link> :<></>}
                        </div>
                    )}
                    </div>
                </div>
            </div>
                <h1 className='tellMore'>Welcome to Baby Sitting Needs {sessionUser.first_name}!</h1>
            <div className='hm_bioDiv'>
                <h1>Hello Everyone, if you are a parent, start creating your
                    events. If you are a babysitter, start booking and making
                    money. Or do both!
                </h1>
            </div>
            <h1 className='babysittingEventsTag'>Babysitting Events</h1>
            <div className='hm_myCreatedBookingsContainer'>
                <div>
                    <div>
                    {bookings.map((booking) =>
                        <div className='hm_createBookingsBorder'>
                            <li className='hm_createdBookings'><strong>Parent:</strong> {`${fetchUserTable(booking?.events[0]?.owner_id)?.first_name} ${fetchUserTable(booking?.events[0]?.owner_id)?.last_name}`}</li>
                            <li className='hm_createdBookings'><strong>Babysitter:</strong> {booking?.first_name} {booking?.last_name} </li>
                            <li className='hm_createdBookings'><strong>Time of Event:</strong> {booking?.events[0]?.event_time}</li>
                            <li className='hm_createdBookings'><strong>{booking?.first_name} is being paid ${wages(booking?.events[0]?.cost, booking?.events[0]?.duration)} for {booking?.events[0]?.duration} hours.</strong> </li>
                            <li className='hm_createdBookings'></li>
                            {sessionUser?.id === booking?.owner_id && <button className='faviconTrash' onClick={()=>handleDelete(booking?.id)}><img src="https://img.icons8.com/color/48/000000/recycle-bin.png"/></button>}
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