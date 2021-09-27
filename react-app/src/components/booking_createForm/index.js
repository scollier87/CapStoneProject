import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOneBooking } from "../../store/booking";
import { useParams } from "react-router";
import './booking_createForm.css'

function NewBookingForm(){
    const {id} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    // const bookings = useSelector((state) => (state.bookings));
    // const booking = bookings.find(booking => booking.id === +id);

    const sessionUser = useSelector(state => state.session.user)

    // const [owner_id, setOwner_id] = useState('')
    const [event_id, setEvent_id] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')

    // const updateOwner_id = (e) => setOwner_id(e.target.value);
    const updateEvent_id = (e) => setEvent_id(e.target.value);
    const updateFirst_name = (e) => setFirst_name(e.target.value);
    const updateLast_name = (e) => setLast_name(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            owner_id : sessionUser.id,
            event_id : +id,
            first_name,
            last_name,
            created_at : new Date(),

        }

    const booking = dispatch(createOneBooking(payload))
        if(booking){
            history.push(`/bookingsuser`)
        }
    }

    return (
        <div>
            <form className='newBookingFormContainer'>

                <label className='booking_formLabel'>First Name?</label>
                <input className='booking_formInput' value={first_name} onChange={updateFirst_name}></input>

                <label className='booking_formLabel'>Last Name?</label>
                <input className='booking_formInput'value={last_name} onChange={updateLast_name}></input>

                <button className='submitBooking_Button' type='submit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )


}

export default NewBookingForm