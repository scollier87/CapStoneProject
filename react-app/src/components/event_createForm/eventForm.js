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
    const [how_many_kids, setHow_many_kids] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState('')
    const [errors, setErrors] = useState({})
    // const startTime = Date.now()


    const updateEvent_time = (e) => setEvent_time(e.target.value);

    const updateHow_many_kids = (e) =>{
        setHow_many_kids(e.target.value);
       let temporaryErrors = { ...errors }
           if(e.target.value < 1) {
               temporaryErrors.how_many_kids = 'Please enter a number of children greater than 0'
               setErrors(temporaryErrors)
           } else {
               delete temporaryErrors.how_many_kids
               setErrors(temporaryErrors)
           }
   }

   const updateDescription = (e) => {
       setDescription(e.target.value);
       let temporaryErrors = {...errors}
       if(e.target.value === '' || e.target.value === ' ')  {
           temporaryErrors.description = 'Must enter a description of event.'
           setErrors(temporaryErrors)
       } else {
           delete temporaryErrors.description
           setErrors(temporaryErrors)
       }
   }


   const updateCost = (e) => {
       setCost(e.target.value);
       let temporaryErrors = {...errors}
       if(e.target.value < 1) {
           temporaryErrors.cost = `Must enter a number greater than 0, no '$' required`
           setErrors(temporaryErrors)
       } else {
           delete temporaryErrors.cost
           setErrors(temporaryErrors)
       }

   }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(how_many_kids >= 0 && description.length > 10 && cost >= 0) {
            const payload ={
                owner_id : sessionUser.id,
                event_time,
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
    }

    const currentErrors = Object.values(errors)

    return(
        <div>
            <Link to={`./home`} className='eventList_HomeBtn'>Home</Link>
            <LogoutButton/>
            <ul>
                {currentErrors.map((errors) => (
                    <li>
                        {errors}
                    </li>
                ))}
            </ul>
            <form className='newEventFormContainer'>
                <label className='event_formFields'>What time is the event Event?</label>
                <input className='event_formInput' value={event_time} onChange={updateEvent_time} type='datetime-local' min="2021-09-29T08:30" required></input>
                <label className='event_formFields'>How many children?</label>
                <input className='event_formInput' value={how_many_kids} onChange={updateHow_many_kids} required></input>
                <label className='event_formFields'>Describe what needs to be done.</label>
                <textarea className='event_forInputTextArea' value={description} onChange={updateDescription} required></textarea>
                <label className='event_formFields'>How much are you paying?</label>
                <input className='event_formInput' value={cost} onChange={updateCost} required></input>
                <button className='submitEvent_Button' type='submit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default NewEventForm;