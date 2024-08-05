import React from 'react'
import ReactDOM from 'react-dom/client'

import './popup.css'
import WeatherCard from './WeatherCard'

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city={'Helsinki'} />
      <WeatherCard city={'Singapore'} />
      <WeatherCard city={'Melbourne'} />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<App />)
