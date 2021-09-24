import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createOneEvent, updateEvent } from '../../store/event'

import './eventForm.css'

function NewEventForm(){

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);

    const [event_time, setEvent_time] = useState('')
    const [how_many_kids, setHow_many_kids] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState('')

    const updateEvent_time = (e) => setEvent_time(e.target.value);
    const updateHow_many_kids = (e) => setHow_many_kids(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateCost = (e) => setCost(e.target.value);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

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
            history.push(`/currentEvents`)
        }
    }

    return(
        <div>
            <form className='newEventFormContainer'>
                <label className='event_formFields'>What time is the Event?</label>
                <input className='event_formInput' value={event_time} onChange={updateEvent_time}></input>
                <label className='event_formFields'>How many children?</label>
                <input className='event_formInput' value={how_many_kids} onChange={updateHow_many_kids}></input>
                <label className='event_formFields'>Describe what needs to be done.</label>
                <textarea className='event_forInputTextArea' value={description} onChange={updateDescription}></textarea>
                <label className='event_formFields'>How much are you paying?</label>
                <input className='event_formInput' value={cost} onChange={updateCost}></input>
                <button className='submitEvent_Button' type='submit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default NewEventForm;