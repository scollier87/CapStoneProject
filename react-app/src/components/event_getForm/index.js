import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getEvents,  deleteEvent} from '../../store/event'
import { Link } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton'
import './event_get.css'

function GetAllEvents() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const events = useSelector((state) => Object.values(state.event));

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    const handldDelete = async (id) => {
        await dispatch(deleteEvent(id))
        await dispatch(getEvents())
        history.push(`/home`)
    }

    const filteredEvents = events.filter((event) => event.owner_id === sessionUser?.id)

    return (
        <div className='eventList_background'>
            <div className='eventHeader'>
            <Link className='eventList_HomeBtn' to={`./home`} >Home</Link>
            <h1 className='eventList_containerLabel1'><strong>Events</strong></h1>
            <LogoutButton/>
            </div>
            <div className='eventList_container'>
                <div className='getEventsContainerDivs'>
                {filteredEvents.map((event) => (
                    <div className='getEventsContainer'>
                        <p className='event_getKeys'>Time of Event: {event.event_time}</p>
                        <p className='event_getKeys'>Number of hours: {event.duration}</p>
                        <p className='event_getKeys'>Number of children: {event.how_many_kids}</p>
                        <p className='event_getKeys'>Description: {event.description}</p>
                        <p className='event_getKeys'>How much? ${event.cost}/hr</p>
                        <div className='event_GetButtons'>
                        <button className='deleteOneEvent' onClick={(e)=>handldDelete(event.id)}> Delete Event </button>
                        <Link  className='updateOneEvent_Button' to={`/events/${event.id}`}> Update Event </Link>
                        {/* <a className="bookEvent_button" href={`/bookings/${event.id}`}> Book Event? </a> */}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}

export default GetAllEvents