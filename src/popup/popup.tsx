import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import './popup.css'
import { fetchOpenWeatherData } from '../utils/api'

const App: React.FC<{}> = () => {
  useEffect(() => {
    fetchOpenWeatherData('Helsinki')
      .then((data) => {
        console.log('👀 data: ', data)
        console.log('👀 Temparature is: ', data.main.temp)
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
