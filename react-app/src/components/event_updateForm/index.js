import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createOneEvent, updateEvent, getEvents} from '../../store/event'
import { useParams } from 'react-router'


function UpdateEventForm(){
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    // const events = events.find(event => event.id === +id);
    const events = useSelector((state) => Object.values(state.event));

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
                history.push(`/eventslist`)
        }
    }
        useEffect(() => {
            dispatch(getEvents())
        }, [dispatch])

        const filteredEvents = events.filter((event) => event.owner_id === sessionUser?.id)
        console.log(id)
        return(
            <div className='updateEvent_container'>
                <form onSubmit={handleSubmit}>
                    <div className='updateEvent_form'>
                    <h1 className='event_containerupdateLabel'>Update Event</h1>
                        <label className='event_updateLabel'>What time?</label>
                        <input className='event_updatedInput' value={event_time} defaultValue={events?.event_time} onChange={updateEvent_time}></input>
                        <label className='event_updateLabel'>How many kids?</label>
                        <input className='event_updatedInput' value={how_many_kids} defaultValue={events?.how_many_kids} onChange={updateHow_many_kids}></input>
                        <label className='event_updateLabel'>Description</label>
                        <textarea className='event_updatedTextarea' value={description} defaultValue={events?.description} onChange={updateDescription}></textarea>
                        <label className='event_updateLabel'>How much are you paying?</label>
                        <input className='event_updatedInput' value={cost} defaultValue={events?.cost} onChange={updateCost}></input>

                        <a className='eventButtonUpdate' href='/eventsupdate'><button type='submit'>Update</button></a>
                    </div>

                </form>
            </div>
        )
}

export default UpdateEventForm