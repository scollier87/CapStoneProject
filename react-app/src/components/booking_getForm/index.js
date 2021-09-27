import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getBookings, deleteBooking } from '../../store/booking'

import './booking_getForm.css'

function GetAllBookings() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const bookings = useSelector((state) => Object.values(state.booking));
    const events = useSelector((state) => Object.values(state.event))
    console.log(bookings)


    useEffect(() => {
        dispatch(getBookings());
    }, [dispatch]);

    const handldDelete = (id) => {
        dispatch(deleteBooking(id))
    }
    const filteredBookings = bookings.filter((booking) => booking.owner_id === sessionUser?.id)

//    const filteredUsers = (owner_id) => {
//         const user = sessionUser.filter((filtered_user) => user.id === owner_id)
//             return user
//     }
    return (
        <div>
            <h1 className='eventList_containerLabel'>Bookings</h1>
                <div className='eventList_outsideContainer'>
                {filteredBookings.map((booking) => (
                    <div className='eventList_insideContainer'>
                    <div className='bookin_div'></div>
                    <p className='booking_getKeys'>{booking.first_name}</p>
                    <div className='bookin_div'></div>
                    <p className='booking_getKeys'>{booking.last_name}</p>
                    <div className='bookin_div'>Who created the event: </div>
                    <p className='booking_getKeys'>{booking?.events[0]?.owner_id}</p>
                    <div className='bookin_div'>When is the event: </div>
                    <p className='booking_getKeys'>{booking?.events[0]?.event_time}</p>
                    <div className='bookin_div'>How many Kids:  </div>
                    <p className='booking_getKeys'>{booking?.events[0]?.how_many_kids}</p>
                    <div className='bookin_div'>Event Description: </div>
                    <p className='booking_getKeys'>{booking?.events[0]?.description}</p>
                    <div className='bookin_div'>Event Cost: </div>
                    <p className='booking_getKeys'>{booking?.events[0]?.cost}</p>

                    <button className='deleteOneBooking' onClick={()=>handldDelete(booking.id)}>Delete Booking</button>
                    </div>
                ))}
                </div>
        </div>
    )

}

export default GetAllBookings