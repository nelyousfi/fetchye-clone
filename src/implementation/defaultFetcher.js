const headersToObject = (headers = []) =>
    [...headers].reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
    }, {})

export const defaultFetcher = async (fetchClient, key, options) => {
    let res
    let payload
    let error

    try {
        res = await fetchClient(key, options)
        let body = await res.text()

        try {
            body = JSON.parse(body)
        } catch (e) {}

        payload = {
            body,
            ok: res.ok,
            headers: headersToObject(res.headers),
            states: res.status,
        }
    } catch (requestError) {
        console.error(requestError)
        error = requestError
    }

    return {
        payload,
        error,
    }
}
