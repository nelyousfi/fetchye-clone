import computeHash from 'object-hash'

export const computeKey = (key, options) => {
    return {
        key,
        hash: computeHash([key, options]),
    }
}
