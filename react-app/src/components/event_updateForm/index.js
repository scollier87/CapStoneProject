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

    const [event_time, setEvent_time] = useState('')
    const [how_many_kids, setHow_many_kids] = useState(0)
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState('')
    const [errors, setErrors] = useState({})

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

        const payload ={
            id : +id,
            owner_id : sessionUser?.id,
            event_time,
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

        const filteredEvents = events.filter((event) => event.owner_id === sessionUser?.id)

        const currentErrors = Object.values(errors)

        return(
            <div className='updateEvent_container'>
                <LogoutButton/>
                <Link to={`/home`} className='hm_myEventsButton'>Home</Link>
                <ul>
                {currentErrors.map((errors) => (
                    <li>
                        {errors}
                    </li>
                ))}
                </ul>
                <form onSubmit={handleSubmit}>
                    <div className='updateEvent_form'>
                    <h1 className='event_containerupdateLabel'>Update Event</h1>
                        <label className='event_updateLabel'>What time?</label>
                        <input className='event_updatedInput' value={event_time} defaultValue={events?.event_time} onChange={updateEvent_time} type='datetime-local' min="2021-09-29T08:30" required></input>
                        <label className='event_updateLabel'>How many kids?</label>
                        <input className='event_updatedInput' value={how_many_kids} defaultValue={events?.how_many_kids} onChange={updateHow_many_kids} required></input>
                        <label className='event_updateLabel'>Description</label>
                        <textarea className='event_updatedTextarea' value={description} defaultValue={events?.description} onChange={updateDescription} required></textarea>
                        <label className='event_updateLabel'>How much are you paying?</label>
                        <input className='event_updatedInput' value={cost} defaultValue={events?.cost} onChange={updateCost} required></input>

                        <a className='eventButtonUpdate' href='/eventsupdate'><button className='actual_eventUpdateBtn' type='submit'>Update</button></a>
                    </div>

                </form>
            </div>
        )
}

export default UpdateEventForm