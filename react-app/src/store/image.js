const LOAD_IMAGES = 'images/LOAD'
const EDIT_IMAGE = 'images/EDIT'
const ADD_IMAGE = 'images/ADD'
const DELETE_IMAGE = 'images/DELETE'
const ADD_USER_TO_IMAGE = 'images/user'

const loadImages = (images) => ({
    type: LOAD_IMAGES,
    images
})

const updateOneImage = (image) => ({
    type: EDIT_IMAGE,
    image
})

const addOneImage = (image) => ({
    type: ADD_IMAGE,
    image
})

const removeImage = (imageId) => ({
    type: DELETE_IMAGE,
    imageId
})

export const addOneUser = (user) => ({
    type: ADD_USER_TO_IMAGE,
    user
})

export const getImages = () => async(dispatch) => {
    const response = await fetch(`/api/images`)
    const imageList = await response.json()
    dispatch(loadImages(imageList))
}

export const createOneImage = (payload) => async dispatch => {
    const {
        parent_id,
        image_url
    } = payload

    const response = await fetch(`/api/images`, {
        method: 'POST',
        headers: { "Content_Type": "application/json"},
        body: JSON.stringify({parent_id, image_url})
    });

    let newImage
    if (response.ok) {
        newImage = await response.json();
        dispatch(addOneImage(newImage))
    }
    return newImage
}

export const updateImage = image => async dispatch => {
    const response = await fetch(`/api/images/${image.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application.json"},
        body: JSON.stringify(image)
    })

    if(response.ok) {
        const image = await response.json()
        dispatch(updateOneImage(image))
        return image
    }
}

export const deleteImage = imageId => async dispatch => {
    const response = await fetch(`/api/images/${imageId}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        dispatch(removeImage(imageId))
    }
}

export const createOneUser = (payload) => async dispatch => {
    const {
        email,
        first_name,
        last_name
    } = payload

    const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, first_name, last_name})
    })

    let newUser
    if(response.ok) {
        newUser = await response.json();
        dispatch(addOneUser(newUser))
    }
    return newUser
}

export default function imageReducer(state={}, action) {
    switch(action.type) {
        case LOAD_IMAGES:
            const newImages = {}
            action['images'].images.forEach(image => {
                newImages[image.id] = image
            })
            return {
                ...state,
                ...newImages
            }

        case ADD_IMAGE:
            if(!state[action.image.id]) {
                return {
                    ...state,
                    [action.image.id] : action.image
                }
            }

            return {
                ...state,
                [action.image.id] : {
                    ...state[action.image.id]
                }
            }

        case DELETE_IMAGE:
            let newState = { ...state }
            delete newState[action.imageId]
            return newState

        case EDIT_IMAGE:
            return {
                ...state,
                [action.image.id] : action.image
            }

        case ADD_USER_TO_IMAGE:
            let userState = { ...state }
            userState[action.user.image_id].images.push(action.images)
            return userState

        default:
            return state
    }
}