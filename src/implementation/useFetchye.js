import { useFetchyeContext } from './useFetchyeContext'
import { computeKey } from './computeKey'
import { useEffect, useRef } from 'react'
import { runAsync } from './runAsync'
import { isLoading } from './isLoading'

export const useFetchye = (key, options = {}, fetcher) => {
    const { defaultFetcher, useFetchyeSelector, dispatch, fetchClient } =
        useFetchyeContext()

    const selectedFetcher =
        typeof fetcher === 'function' ? fetcher : defaultFetcher
    const computedKey = computeKey(key, options)
    const selectorState = useFetchyeSelector(computedKey.hash)
    const numberOfRenders = useRef(0)
    numberOfRenders.current += 1

    useEffect(() => {
        const { loading, data, error } = selectorState
        if (options.defer) {
            return
        }
        if (!loading && !data && !error) {
            runAsync({
                dispatch,
                computedKey,
                fetcher: selectedFetcher,
                fetchClient,
                options,
            })
        }
    })

    return {
        isLoading: isLoading({
            loading: selectorState.current.loading,
            data: selectorState.current.data,
            numOfRenders: numberOfRenders.current,
            options,
        }),
        error: selectorState.current.error,
        data: selectorState.current.data,
        run() {
            return runAsync({
                dispatch,
                computedKey,
                fetcher: selectedFetcher,
                fetchClient,
                options,
            })
        },
    }
}
