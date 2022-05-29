export const isLoading = ({ loading, data, numberOfRenders, options }) => {
    if (numberOfRenders === 1) {
        if (options.defer) {
            return false
        }
        if (!data) {
            return true
        }
    }
    if (loading) {
        return true
    }
    return false
}
