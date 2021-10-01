import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createOneEvent, updateEvent, getEvents} from '../../store/event'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import './event_updateForm.css'
import LogoutButton from '../auth/LogoutButton'


function UpdateEventForm(){
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    // const events = events.find(event => event.id === +id);
    const events = useSelector((state) => Object.values(state.event));

    const filteredEvents = events.filter((event) => event.id === +id)

    const [event_time, setEvent_time] = useState(filteredEvents[0]?.event_time)
    const [duration, setDuration] = useState(filteredEvents[0]?.duration)
    const [how_many_kids, setHow_many_kids] = useState(filteredEvents[0]?.how_many_kids)
    const [description, setDescription] = useState(filteredEvents[0]?.description)
    const [cost, setCost] = useState(filteredEvents[0]?.cost)
    const [errors, setErrors] = useState({})

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
            temporaryErrors.cost = `Choose an amount (50-200), no '$' required`
            setErrors(temporaryErrors)
        } else {
            delete temporaryErrors.cost
            setErrors(temporaryErrors)
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload ={
            id : +id,
            owner_id : sessionUser?.id,
            event_time,
            duration,
            how_many_kids,
            description,
            cost,
            created_at : new Date(),
        }

        const eventUpdate = await dispatch(updateEvent(payload))
            if (eventUpdate) {
                history.push(`/eventsuser`)
        }
    }
        useEffect(() => {
            dispatch(getEvents())
        }, [dispatch])

        const currentErrors = Object.values(errors)

        return(
            <div className='updateEvent_container'>
                <Link className='updatedEvent_HmBtn' to={`/home`} >Home</Link>
                <LogoutButton/>

                <form className='updateEvent_form' onSubmit={handleSubmit}>
                        <ul>
                        {currentErrors.map((errors) => (
                            <li>
                                {errors}
                            </li>
                        ))}
                        </ul>
                        <label className='event_updateLabel'>What time?</label>
                        <input className='event_updatedInput' defaultValue={event_time} onChange={updateEvent_time} type='datetime-local' min="2021-10-01T08:30" required></input>
                        <label className='event_formFields'>How many hours?</label>
                        <input className='event_formInput' type='number' value={duration} onChange={updateDuration} min='1' max='8' required></input>
                        <label className='event_updateLabel'>How many kids?</label>
                        <input className='event_updatedInput' type='number' value={how_many_kids} onChange={updateHow_many_kids} min='1' max='15' required></input>
                        <label className='event_updateLabel'>Describe what needs to be done.(50-200 characters)</label>
                        <textarea className='event_updatedTextarea' type='text' value={description} onChange={updateDescription} minlength='50' maxlength='200' required></textarea>
                        <label className='event_updateLabel'>How much are you paying?</label>
                        <input className='event_updatedInput' type='number' value={cost} onChange={updateCost} min='15' max='200' required></input>
                        <a className='eventButtonUpdate' href='/eventsupdate'><button className='actual_eventUpdateBtn' type='submit'>Update</button></a>
                </form>
            </div>
        )
}

export default UpdateEventForm