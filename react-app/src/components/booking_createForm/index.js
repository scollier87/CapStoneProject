import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOneBooking, getBookings } from "../../store/booking";
import { useParams } from "react-router";
import './booking_createForm.css'
import { Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { getEvents } from "../../store/event";

function NewBookingForm(){
    const {id} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    // const bookings = useSelector((state) => Object.values(state.bookings));
    // const booking = bookings.find(booking => booking.id === +id);

    const sessionUser = useSelector(state => state.session.user)

    // const [owner_id, setOwner_id] = useState('')
    // const [event_id, setEvent_id] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [errors, setErrors] = useState({})

    // const updateOwner_id = (e) => setOwner_id(e.target.value);
    // const updateEvent_id = (e) => setEvent_id(e.target.value);

    const updateFirst_name = (e) => {
        setFirst_name(e.target.value);
        // console.log(first_name)
        let temporaryErrors = {...errors}
        if(!e.target.value || e.target.value.length > 20) {
            temporaryErrors.first_name = 'First name can not be blank (2-20 characters).'
            setErrors(temporaryErrors)
        }
        if(e.target.value.includes(' ')){
            temporaryErrors.first_name = 'No whitespace allowed.'
            setErrors(temporaryErrors)
        }else{
            delete temporaryErrors.first_name;
            setErrors(temporaryErrors)
        }

    }

    const updateLast_name = (e) => {
        setLast_name(e.target.value);
        let temporaryErrors = {...errors}
        if(!e.target.value || e.target.value >20) {
            temporaryErrors.last_name = 'Last name can not be blank (2-20 characters).'
            setErrors(temporaryErrors)
        }
        if(e.target.value.includes(' ')){
            temporaryErrors.last_name = 'No whitespace allowed'
            setErrors(temporaryErrors)
        }else{
            delete temporaryErrors.last_name;
            setErrors(temporaryErrors)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(first_name.length > 1 && last_name.length < 20){
            const payload = {
                owner_id : sessionUser.id,
                event_id : +id,
                first_name,
                last_name,
                created_at : new Date(),

            }

            const booking = await dispatch(createOneBooking(payload))
                if(booking){
                    // setTimeout(() => {
                        await dispatch(getBookings())
                        await dispatch(getEvents())
                        history.push(`/home`)
                // }, 500)
            }

        }
    }
    // console.log(sessionUser.first_name)
    const currentErrors = Object.values(errors)

    return (
        <div className='newBooking_OuterBackground'>
            <div className='newBooking_Header'>
            <Link to={`/home`} className='newBooking_HomeBtn'>Home</Link>
            <LogoutButton/>
            </div>
            <form className='newBookingFormContainer' onSubmit={handleSubmit}>
             <ul>
                {currentErrors.map((errors) => (
                    <li>
                        {errors}
                    </li>
                ))}
            </ul>
                <label className='booking_formLabel'>First Name?</label>
                <input className='booking_formInput' value={first_name} onChange={updateFirst_name} type='text' minLength="2" maxLength="20" size="22" required></input>

                <label className='booking_formLabel'>Last Name?</label>
                <input className='booking_formInput' value={last_name} onChange={updateLast_name} type='text' minLength="2" maxLength="20" size="22" required></input>

                <button className='submitBooking_Button' type='submit'>Submit</button>
            </form>
        </div>
    )


}

export default NewBookingForm