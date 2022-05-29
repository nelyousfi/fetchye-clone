import { useContext } from 'react'
import { FetchyeContext } from './FetchyeProvider'

export const useFetchyeContext = () => {
    return useContext(FetchyeContext)
}
