const fetcher = async (fetchClient, key) => {
    let res
    let payload
    let error
    try {
        res = await fetchClient(`https://jsonplaceholder.typicode.com/${key}`)
        payload = await res.json()
    } catch (e) {
        console.error(e)
        error = e
    }
    return {
        payload,
        error,
    }
}

export default fetcher
