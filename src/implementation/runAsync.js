import { ERROR, IS_LOADING, SET_DATA } from './SimpleCache'

export const runAsync = async ({
    dispatch,
    computedKey,
    fetcher,
    fetchClient,
    options,
}) => {
    dispatch({
        type: IS_LOADING,
        hash: computedKey.hash,
    })
    const { payload: data, error } = await fetcher(
        fetchClient,
        computedKey.key,
        options
    )
    if (!error) {
        dispatch({
            type: SET_DATA,
            hash: computedKey.hash,
            value: data,
        })
    } else {
        dispatch({
            type: ERROR,
            hash: computedKey.hash,
            error,
        })
    }
    return { data, error }
}
