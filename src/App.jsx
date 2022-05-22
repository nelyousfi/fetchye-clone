import { Link, Route, Routes } from 'react-router-dom'
import Blog from './routes/blog'
import Contact from './routes/contact'
import Home from './routes/home'
import SurpriseMe from './routes/SurpriseMe'

const App = () => {
    return (
        <>
            <div>
                <nav>
                    <Link to={'/'}>Home</Link>
                    {' | '}
                    <Link to={'/contact'}>Contact</Link>
                    {' | '}
                    <Link to={'/blog'}>Blog</Link>
                    {' | '}
                    <Link to={'/surprise'}>Surprise Me</Link>
                </nav>
            </div>

            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/blog'} element={<Blog />} />
                <Route path={'/contact'} element={<Contact />} />
                <Route path={'/surprise'} element={<SurpriseMe />} />
            </Routes>
        </>
    )
}

export default App
