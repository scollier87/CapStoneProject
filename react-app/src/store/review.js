const LOAD_REVIEWS = 'reviews/LOAD'
const EDIT_REVIEW = 'reviews/EDIT'
const ADD_REVIEW = 'reviews/ADD'
const DELETE_REVIEW = 'reviews/DELETE'
const ADD_USER_TO_REVIEW = 'reviews/user'

const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

const updateOneReview = (review) => ({
    type: EDIT_REVIEW,
    review
})

const addOneReview = (review) => ({
    type: ADD_REVIEW,
    review
})

const removeReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const addOneUser = (user) => ({
    type: ADD_USER_TO_REVIEW,
    user
})

export const getReviews = () => async(dispatch) => {
    const response = await fetch(`/api/reviews`)
    const reviewList = await response.json()
    dispatch(loadReviews(reviewList))
}

export const createOneReview = (payload) => async dispatch => {
    const {
        owner_id,
        body,
        created_at
    } = payload

    const response = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: { "Content_Type": "application/json" },
        body: JSON.stringify({owner_id, body, created_at})
    });

    let newReview
    if (response.ok) {
        newReview = await response.json();
        dispatch(addOneReview(newReview))
    }
    return newReview
}

export const updateReview = review => async dispatch => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(review)
    })

    if(response.ok) {
        const review = await response.json()
        dispatch(updateOneReview(review))
        return review
    }
}

export const deleteReview = reviewId => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        dispatch(removeReview(reviewId))
    }
}

export const createOneUser = (payload) => async dispatch => {
    const {
        parent_pic,
        email,
        first_name,
        last_name
    } = payload

    const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email, first_name, last_name})
    })

    let newUser
    if(response.ok) {
        newUser = await response.json();
        dispatch(addOneUser(newUser))
    }
    return newUser
}

export default function reviewReducer(state={}, action) {
    switch(action.type) {
        case LOAD_REVIEWS:
            const newReviews = {}
            action['reviews'].reviews.forEach(review => {
                newReviews[review.id] = review;
            })
            return {
                ...state,
                ...newReviews
            }

        case ADD_REVIEW:
            if(!state[action.event.id]) {
                return {
                    ...state,
                    [action.review.id] : action.review
                }
            }

            return {
                ...state,
                [action.review.id] : {
                    ...state[action.review.id]
                }
            }

        case DELETE_REVIEW:
            let newState = { ...state }
            delete newState[action.reviewId]
            return newState

        case EDIT_REVIEW:
            return {
                ...state,
                [action.review.id] : action.review
            }

        case ADD_USER_TO_REVIEW:
            let userState = { ...state }
            userState[action.user.review_id].reviews.push(action.reviews)
            return userState

        default:
            return state
    }
}