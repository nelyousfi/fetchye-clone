import React from 'react'
import { useFetchye } from 'fetchye'

const Content = () => {
    const { isLoading, data } = useFetchye(
        'https://jsonplaceholder.typicode.com/posts/1'
    )

    return isLoading ? (
        <p>Loading...</p>
    ) : (
        <div>
            <h4>{data?.body.title}</h4>
            <p>{data?.body.body}</p>
        </div>
    )
}

const Page = ({ title }) => {
    return (
        <>
            <h1>{title}</h1>
            <Content />
        </>
    )
}

const App = () => {
    return <Page title={'Main Page'} />
}

export default App
