import { useRef } from 'react'

export const useSubscription = () => {
    const subscribers = useRef(new Set())

    const notify = () => {
        subscribers.current.forEach((callback) => callback())
    }

    const subscribe = (callback) => {
        subscribers.current.add(callback)
        return () => subscribers.current.delete(callback)
    }

    return [notify, subscribe]
}
