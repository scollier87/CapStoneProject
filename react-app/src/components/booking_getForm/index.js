import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getBookings, deleteBooking } from '../../store/booking'
import { Link } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'

import './booking_getForm.css'

function GetAllBookings() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const bookings = useSelector((state) => Object.values(state.booking));
    const events = useSelector((state) => Object.values(state.event))

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
        dispatch(getBookings());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteBooking(id))
    }

    const fetchUserTable = (id) => {
        const user = users?.filter((user) => (user.id === id))
        const [userObj] = user
        return userObj
    }


    const filteredBookings = bookings.filter((booking) => booking.owner_id === sessionUser?.id)

//    const filteredUsers = (owner_id) => {
//         const user = sessionUser.filter((filtered_user) => user.id === owner_id)
//             return user
//     }
    return (
        <div>
            <LogoutButton/>
            <Link to={`./home`} className='hm_myEventsButton'>Home</Link>
            <h1 className='eventList_containerLabel'>Bookings</h1>
                <div className='labelContainer'>
                    <h3>Babysitter</h3>
                    <h3>Parent</h3>
                    <h3>Event Time</h3>
                    <h3>Children</h3>
                    <h3>Description</h3>
                    <h3>Cost</h3>
                </div>
                <div className='eventList_outsideContainer'>
                {filteredBookings.map((booking) => (
                    <div className='eventList_insideContainer'>
                        {/* <div className='bookin_div'></div> */}
                        <p className='booking_getKeys_Sitter'>{`${booking.first_name} ${booking.last_name}`}</p>
                        {/* <div className='bookin_div'></div> */}
                        {/* <p className='booking_getKeys'>{booking.last_name}</p> */}
                        {/* <div className='bookin_div'>Who created the event: </div> */}
                        <p className='booking_getKeys_Parent'>{`${fetchUserTable(booking?.events[0]?.owner_id)?.first_name} ${fetchUserTable(booking?.events[0]?.owner_id)?.last_name}`}</p>
                        {/* <div className='bookin_div'>When is the event: </div> */}
                        <p className='booking_getKeys_Time'>{booking?.events[0]?.event_time}</p>
                        {/* <div className='bookin_div'>How many Kids:  </div> */}
                        <p className='booking_getKeys_Children'>{booking?.events[0]?.how_many_kids}</p>
                        {/* <div className='bookin_div'>Event Description: </div> */}
                        <p className='booking_getKeys_Description'>{booking?.events[0]?.description}</p>
                        {/* <div className='bookin_div'>Event Cost: </div> */}
                        <p className='booking_getKeys_Cost'>${booking?.events[0]?.cost}/hour</p>

                        <button className='deleteOneBooking' onClick={()=>handleDelete(booking.id)}>Delete Booking</button>
                    </div>
                ))}
                </div>
        </div>
    )

}

export default GetAllBookings