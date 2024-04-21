import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    objectId: 10245,
    apiData: {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            return {...state, apiData : action.payload}
        },
        clearData: () => {
            return initialState
        },
        inputId: (state, action) => {
            return { ...state, objectId: action.payload }
        },
        incrementId: (state) => {
            return { ...state, objectId: state.objectId + 1 }
        },
        decrementId: (state) => {
            return { ...state, objectId: state.objectId - 1 }
        }
    }
})

export const { setData, clearData, incrementId, decrementId, inputId } = dataSlice.actions
// thunk action creater
export const fetchData = () => {
    // thunk about data
    const fetchDataThunk = async (dispatch, getState) => {
        // state that matters to be able to know what to do
        let state = getState()

        //side effects
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const rData = await response.json()
        //send that data to the store by 
        // dispatching the "setData" action with a payload of rData
        dispatch(setData(rData))
    }
    return fetchDataThunk
}

export default dataSlice.reducer