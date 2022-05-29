import { Header } from '../components/Header'
import fetcher from '../utils/fetcher'
import { useFetchye } from '../implementation/useFetchye'

const SurpriseMe = () => {
    const { isLoading, data, run } = useFetchye(
        'posts/1',
        {
            defer: true,
        },
        fetcher
    )

    const surpriseMe = async () => {
        await run()
    }

    return (
        <>
            <Header title={'SurpriseMe'} />
            <button onClick={surpriseMe}>Surprise Me</button>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h4>{data?.title}</h4>
                    <p>{data?.body}</p>
                </div>
            )}
        </>
    )
}

export default SurpriseMe
