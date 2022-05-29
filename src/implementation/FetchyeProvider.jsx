import { createContext, useEffect, useMemo, useReducer, useRef } from 'react'
import { useRefReducer } from './useRefReducer'
import { useSubscription } from './useSubscription'
import { SimpleCache } from './SimpleCache'
import { defaultFetcher } from './defaultFetcher'
import { defaultEqualityChecker } from './defaultEqualityChecker'

export const FetchyeContext = createContext({})

const makeUseFetchyeSelector =
    ({ state, subscribe, getCacheByKey, equalityChecker }) =>
    (key) => {
        const [, forceRender] = useReducer((x) => x + 1, 0)
        const initialValue = getCacheByKey(state.current, key)
        const lastSelectorValue = useRef(initialValue)
        const selectorValue = useRef(initialValue)

        useEffect(() => {
            function checkForUpdates() {
                const nextValue = getCacheByKey(state.current, key)
                lastSelectorValue.current = selectorValue.current
                selectorValue.current = nextValue
                if (
                    equalityChecker(
                        selectorValue.current,
                        lastSelectorValue.current
                    )
                ) {
                    return
                }
                forceRender()
            }

            checkForUpdates()
            return subscribe(checkForUpdates)
        }, [key])

        return selectorValue
    }

export const FetchyeProvider = ({
    cache = SimpleCache(),
    fetcher = defaultFetcher,
    equalityChecker = defaultEqualityChecker,
    fetchClient = fetch,
    initialState = cache.reducer(undefined, { type: '' }),
    children,
}) => {
    const [notify, subscribe] = useSubscription()

    const [state, dispatch] = useRefReducer(cache.reducer, initialState, notify)

    const memoizedConfig = useMemo(
        () => ({
            dispatch,
            cache,
            defaultFetcher: fetcher,
            useFetchyeSelector: makeUseFetchyeSelector({
                state,
                subscribe,
                getCacheByKey: cache.getCacheByKey,
                equalityChecker,
            }),
            fetchClient,
        }),
        [
            cache,
            dispatch,
            equalityChecker,
            fetchClient,
            fetcher,
            state,
            subscribe,
        ]
    )

    return (
        <FetchyeContext.Provider value={memoizedConfig}>
            {children}
        </FetchyeContext.Provider>
    )
}
