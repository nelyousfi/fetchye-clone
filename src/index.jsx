import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FetchyeProvider } from 'fetchye'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <FetchyeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </FetchyeProvider>
    </React.StrictMode>
)
