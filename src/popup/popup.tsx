import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import './popup.css'
import { fetchOpenWeatherData } from '../utils/api'

const App: React.FC<{}> = () => {
  useEffect(() => {
    fetchOpenWeatherData()
      .then((data) => {
        console.log('👀 Temperature is: ', data.main.temp)
      })
      .catch((err) => console.log('👀 error: ', err))
  }, [])

  return (
    <div>
      <img src="icon.png" />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<App />)
