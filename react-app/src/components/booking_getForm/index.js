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

    useEffect(() => {
        dispatch(getBookings());
    }, [dispatch]);

    const handldDelete = (id) => {
        dispatch(deleteBooking(id))
    }

    const filteredBookings = bookings.filter((booking) => booking.owner_id === sessionUser?.id)

    return (
        <div className='bookingList_container'>
            <h1 className='eventList_containerLabel'>Bookings</h1>
                {filteredBookings.map((booking) => (
                    <>
                    <p className='booking_getKeys'>{booking.first_name}</p>
                    <p className='booking_getKeys'>{booking.last_name}</p>
                    <button className='deleteOneBooking' onClick={(e)=>handldDelete(booking.id)}>Delete Booking</button>
                    </>
                ))}

        </div>
    )

}

export default GetAllBookings