import { useRef } from 'react'

export const useRefReducer = (reducer, initialState, notify) => {
    const state = useRef(initialState)

    const dispatch = (action) => {
        state.current = reducer(state.current, action)
        notify()
    }

    return [state, dispatch]
}
