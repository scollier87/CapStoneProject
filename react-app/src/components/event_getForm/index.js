import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getEvents,  deleteEvent} from '../../store/event'

function GetAllEvents() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const events = useSelector((state) => Object.values(state.event));

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    const handldDelete = (id) => {
        dispatch(deleteEvent(id))
    }

    const filteredEvents = events.filter((event) => event.owner_id === sessionUser?.id)
    
    return (
        <div className='eventList_container'>
            <h1 className='eventList_containerLabel'>Events</h1>
                {filteredEvents.map((event) => (
                    <>
                    <p className='event_getKeys'>{event.event_time}</p>
                    <p className='event_getKeys'>{event.how_many_kids}</p>
                    <p className='event_getKeys'>{event.description}</p>
                    <p className='event_getKeys'>{event.cost}</p>
                    <button className='deleteOneEvent' onClick={(e)=>handldDelete(event.id)}>Delete Event</button>
                    </>
                ))}
        </div>
    )
}

export default GetAllEvents