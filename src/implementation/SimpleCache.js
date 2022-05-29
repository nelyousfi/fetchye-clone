export const IS_LOADING = '@fetchye/IS_LOADING'
export const SET_DATA = '@fetchye/SET_DATA'
export const DELETE_DATA = '@fetchye/DELETE_DATA'
export const ERROR = '@fetchye/ERROR'
export const CLEAR_ERROR = '@fetchye/CLEAR_ERROR'

const reducer = (
    state = {
        errors: {},
        loading: {},
        data: {},
    },
    action
) => {
    switch (action.type) {
        case DELETE_DATA: {
            const { [action.hash]: deleteEntry, ...nextData } = state.date
            return {
                ...state,
                data: {
                    ...nextData,
                },
            }
        }
        case CLEAR_ERROR: {
            const { [action.hash]: deleteEntry, ...nextErrors } = state.errors
            return {
                ...state,
                errors: {
                    ...nextErrors,
                },
            }
        }
        case ERROR: {
            const { [action.hash]: deleteEntry, ...nextLoading } = state.loading
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.hash]: action.error,
                },
                loading: {
                    ...nextLoading,
                },
            }
        }
        case IS_LOADING: {
            return {
                state,
                loading: {
                    ...state.loading,
                    [action.hash]: action.hash,
                },
            }
        }
        case SET_DATA: {
            const { [action.hash]: deletedEntry, ...nextLoading } =
                state.loading
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.hash]: action.value,
                },
                loading: {
                    ...nextLoading,
                },
            }
        }
        default:
            return state
    }
}

const getCacheByKey = (cache = {}, key) => {
    const data = cache.data?.[key]
    const loading = !!cache.loading?.[key]
    const error = cache.errors?.[key]
    return {
        data,
        loading,
        error,
    }
}

export const SimpleCache = (cacheSelector = (state) => state) => {
    return {
        getCacheByKey,
        reducer,
        cacheSelector,
    }
}
