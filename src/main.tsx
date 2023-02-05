import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import StateContext from './context/StateContext'
import './index.css'
import Layout from './Layout'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StateContext>
      <Layout>
        <App />
      </Layout>
    </StateContext>
  </React.StrictMode >,
)
