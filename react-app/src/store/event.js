const LOAD_EVENTS = 'events/LOAD'
const EDIT_EVENT = 'events/EDIT'
const ADD_EVENT = 'events/ADD'
const DELETE_EVENT = 'events/DELETE'
const ADD_BOOKING_TO_EVENT = 'events/booking'

const loadEvents = (events) => ({
    type: LOAD_EVENTS,
    events
})

const updateOneEvent = (event) => ({
    type: EDIT_EVENT,
    event
})

const addOneEvent = (event) => ({
    type: ADD_EVENT,
    event
})

const removeEvent = (eventId) => ({
    type: DELETE_EVENT,
    eventId,
})

export const addOneBooking = (booking) => ({
    type: ADD_BOOKING_TO_EVENT,
    booking
})

export const getEvents = () => async(dispatch) => {
    const response = await fetch(`/api/events`);
    const eventList = await response.json()
    dispatch(loadEvents(eventList))
}

export const createOneEvent = (payload) => async dispatch => {
    const {
        owner_id,
        event_time,
        duration,
        how_many_kids,
        description,
        cost,
        created_at
    } = payload

    const response = await fetch(`/api/events`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner_id, event_time, duration, how_many_kids, description, cost, created_at })
    });

    let newEvent
    if (response.ok) {
        newEvent = await response.json();
        dispatch(addOneEvent(newEvent))
    }
    return newEvent
}

export const updateEvent = event => async dispatch => {
    const response = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
    })

    if (response.ok) {
        const event = await response.json()
        dispatch(updateOneEvent(event))
        return event
    }
}

export const deleteEvent = eventId => async dispatch => {
    const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(removeEvent(eventId))
    }
}

export const createOneBooking = (payload) => async dispatch => {
    const {
        owner_id,
        event_id,
        first_name,
        last_name,
        created_at,
    } = payload

    const response = await fetch(`/api/bookings`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({owner_id, event_id, first_name, last_name, created_at})
    })

    let newBooking
    if(response.ok){
        newBooking = await response.json();
        dispatch(addOneBooking(newBooking))
    }
    return newBooking
}

export default function eventReducer(state={}, action){
    switch (action.type) {
        case LOAD_EVENTS:
            const newEvents = {}
            action['events'].events.forEach(event => {
                newEvents[event.id] = event;
            })
            return {
                ...state,
                ...newEvents
            }

        case ADD_EVENT:
            if(!state[action.event.id]) {
                return {
                    ...state,
                    [action.event.id] : action.event
                }
            }

            return {
                ...state,
                [action.event.id] : {
                    ...state[action.event.id]
                }
            }

        case DELETE_EVENT:
            let newState = { ...state }
            delete newState[action.eventId]
            return newState

        case EDIT_EVENT:
            return {
                ...state,
                [action.event.id] : action.event
            }

        case ADD_BOOKING_TO_EVENT:
            let bookingState = { ...state }
            bookingState[action.booking.event_id].bookings.push(action.booking)
            return bookingState

        default:
            return state
    }
}