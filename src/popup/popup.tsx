import React from 'react'
import ReactDOM from 'react-dom/client'

import 'fontsource-roboto'
import './popup.css'
import WeatherCard from './WeatherCard'

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city={'Helsinki'} />
      <WeatherCard city={'Singapore'} />
      <WeatherCard city={'Error'} />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<App />)
