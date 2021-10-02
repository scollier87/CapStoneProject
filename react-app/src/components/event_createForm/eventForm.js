import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createOneEvent, updateEvent } from '../../store/event'
import { Link } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'
import './eventForm.css'

function NewEventForm(){

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);

    const [event_time, setEvent_time] = useState('')
    const [duration, setDuration] = useState('')
    const [how_many_kids, setHow_many_kids] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState('')
    const [errors, setErrors] = useState({})
    // const startTime = Date.now()


    const updateEvent_time = (e) => setEvent_time(e.target.value);

    const updateDuration = (e) => {
        setDuration(e.target.value);
        let temporaryErrors = { ...errors }
            if(e.target.value < 1 || e.target.value > 8) {
                temporaryErrors.duration = 'minimum number of hours is 1 and maximum is 8'
                setErrors(temporaryErrors)
            } else {
                delete temporaryErrors.duration
                setErrors(temporaryErrors)
            }
    }

    const updateHow_many_kids = (e) =>{
        setHow_many_kids(e.target.value);
       let temporaryErrors = { ...errors }
           if(e.target.value < 1 || e.target.value > 15) {
               temporaryErrors.how_many_kids = 'Please enter the number of children (1-15)'
               setErrors(temporaryErrors)
           } else {
               delete temporaryErrors.how_many_kids
               setErrors(temporaryErrors)
           }
   }

   const updateDescription = (e) => {
       setDescription(e.target.value);
       let temporaryErrors = {...errors}
       if(e.target.value < 50 || e.target.value > 200)  {
           temporaryErrors.description = 'Description must be between 50-200 characters.'
           setErrors(temporaryErrors)
       } else {
           delete temporaryErrors.description
           setErrors(temporaryErrors)
       }
   }


   const updateCost = (e) => {
       setCost(e.target.value);
       let temporaryErrors = {...errors}
       if(e.target.value < 15 || e.target.value > 200) {
           temporaryErrors.cost = `Choose an amount (15-200), no '$' required`
           setErrors(temporaryErrors)
       } else {
           delete temporaryErrors.cost
           setErrors(temporaryErrors)
       }

   }

    const handleSubmit = async (e) => {
        e.preventDefault();
            const payload ={
                owner_id : sessionUser.id,
                event_time,
                duration,
                how_many_kids,
                description,
                cost,
                created_at : new Date(),
            }


            const event = await dispatch(createOneEvent(payload))
                if(event){
                        history.push(`/eventsuser`)
                }
    }

    const currentErrors = Object.values(errors)

    return(
        <div className='event_createFormBackground'>
            <Link className='eventList_HomeBtn' to={`./home`} >Home</Link>
            <LogoutButton/>

            <form className='newEventFormContainer' onSubmit={handleSubmit}>
                <ul>
                {currentErrors.map((errors) => (
                    <li>
                        {errors}
                    </li>
                    ))}
                </ul>
                <label className='event_formFields'>What time is the event Event?</label>
                <input className='event_formInput' Defaultvalue={event_time} onChange={updateEvent_time} type='datetime-local' min={"2021-10-01T08:30"} required></input>
                <label className='event_formFields'>How many hours?</label>
                <input className='event_formInput' type='number' value={duration} onChange={updateDuration} min='1' max='8' required></input>
                <label className='event_formFields'>How many children?(1-15)</label>
                <input className='event_formInput' type='number' value={how_many_kids} onChange={updateHow_many_kids} min='1' max='15' required></input>
                <label className='event_formFields'>Describe what needs to be done.(50-200 characters)</label>
                <textarea className='event_forInputTextArea' type='text' value={description} onChange={updateDescription} minLength='50' maxLength='200'required></textarea>
                <label className='event_formFields'>How much are you paying?</label>
                <input className='event_formInput' type='number' value={cost} onChange={updateCost} min='15' max='200' required></input>
                <button className='submitEvent_Button' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default NewEventForm;