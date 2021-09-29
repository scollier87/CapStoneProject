import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOneBooking } from "../../store/booking";
import { useParams } from "react-router";
import './booking_createForm.css'
import { Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

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
    const [errors, setErrors] = useState({})

    // const updateOwner_id = (e) => setOwner_id(e.target.value);
    // const updateEvent_id = (e) => setEvent_id(e.target.value);

    const updateFirst_name = (e) => {
        setFirst_name(e.target.value);
        // console.log(first_name)
        let temporaryErrors = {...errors}
        if(!first_name.length || first_name.length <= 1) {
            temporaryErrors.first_name = 'First name can not be blank and must be more than 1 character.'
            setErrors(temporaryErrors)

        }
        else{
            delete temporaryErrors.first_name;
            setErrors(temporaryErrors)
        }

    }

    const updateLast_name = (e) => {
        setLast_name(e.target.value);
        let temporaryErrors = {...errors}
        if(!last_name.length || last_name <=1) {
            temporaryErrors.last_name = 'Last name can not be black and must be more than 1 character.'
            setErrors(temporaryErrors)
        }
        else{
            delete temporaryErrors.last_name;
            setErrors(temporaryErrors)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(first_name.length > 1 && last_name.length > 1){
            const payload = {
                owner_id : sessionUser.id,
                event_id : +id,
                first_name,
                last_name,
                created_at : new Date(),

            }

            const booking = dispatch(createOneBooking(payload))
                if(booking){
                    setTimeout(() => {
                        history.push(`/bookingsuser`)
                }, 100)}

        }
    }

    const currentErrors = Object.values(errors)

    return (
        <div>
            <LogoutButton/>
            <Link to={`/home`} className='newBooking_HomeBtn'>Home</Link>
            <ul>
                {currentErrors.map((errors) => (
                    <li>
                        {errors}
                    </li>
                ))}
            </ul>
            <form className='newBookingFormContainer'>

                <label className='booking_formLabel'>First Name?</label>
                <input className='booking_formInput' value={first_name} onChange={updateFirst_name} type='text' required></input>

                <label className='booking_formLabel'>Last Name?</label>
                <input className='booking_formInput'value={last_name} onChange={updateLast_name} type='text' required></input>

                <button className='submitBooking_Button' type='submit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )


}

export default NewBookingForm