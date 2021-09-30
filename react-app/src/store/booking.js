const LOAD_BOOKINGS = 'bookings/LOAD'
const ADD_BOOKING = 'bookings/ADD'
const DELETE_BOOKING = 'bookings/DELETE'
const ADD_EVENT_TO_BOOKING = 'bookings/events'

const loadBookings = (bookings) => ({
    type: LOAD_BOOKINGS,
    bookings
})

const addOneBooking = (booking) => ({
    type: ADD_BOOKING,
    booking
})

const removeBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId,
})

export const addOneEvent = (event) => ({
    type: ADD_EVENT_TO_BOOKING,
    event
})

export const getBookings = () => async(dispatch) => {
    const response = await fetch(`/api/bookings`);
    const bookingList = await response.json()
    dispatch(loadBookings(bookingList))
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
        body: JSON.stringify({ owner_id, event_id, first_name, last_name, created_at})
    });

    let newBooking
    if (response.ok) {
        newBooking = await response.json();
        newBooking.events = []
        dispatch(addOneBooking(newBooking))
    }
    return newBooking
}

export const deleteBooking = bookingId => async dispatch => {
    const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(removeBooking(bookingId))
    }
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

export default function bookingReducer(state={}, action){
    switch (action.type) {
        case LOAD_BOOKINGS:
            const newBookings = {}
            action['bookings'].bookings.forEach(booking => {
                newBookings[booking.id] = booking;
            })
            return {
                ...state,
                ...newBookings
            }

        case ADD_BOOKING:
            if(!state[action.booking.id]) {
                return {
                    ...state,
                    [action.booking.id] : action.booking
                }
            }

            return {
                ...state,
                [action.booking.id] : {
                    ...state[action.booking.id]
                }
            }

        case DELETE_BOOKING:
            let newState = { ...state }
            delete newState[action.bookingId]
            return newState

        case ADD_EVENT_TO_BOOKING:
            let eventState = { ...state }
            eventState[action.event.booking_id].events.push(action.event)
            return eventState

        default:
            return state
    }
}