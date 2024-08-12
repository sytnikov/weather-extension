import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import { Grid, Box, Paper, InputBase, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import 'fontsource-roboto'
import './popup.css'
import WeatherCard from './WeatherCard'
import { getStoredCities, setStoredCities } from '../utils/storage'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>('')

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
  }, [])

  const handleAddCityButtonClick = () => {
    if (cityInput === '') {
      return
    }
    const updatedCities = [...cities, cityInput]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
      setCityInput('')
    })
  }

  const handleDeleteCityButtonClick = (index: number) => {
    cities.splice(index, 1)
    const updatedCities = [...cities]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
    })
  }

  return (
    <div>
      <Box mx={'8px'} my={'16px'}>
        <Grid
          container
          // direction="row"
          // justifyContent="space-between"
          // alignItems="center"
        >
          <Grid item xs={12}>
            <Paper>
              <Box px={'15px'} py={'5px'} display={'flex'}>
                <InputBase
                  placeholder="Add a city name"
                  value={cityInput}
                  onChange={(event) => setCityInput(event.target.value)}
                  fullWidth
                />
                <IconButton onClick={handleAddCityButtonClick}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {cities.map((city, index) => (
          <WeatherCard
            city={city}
            key={index}
            onDelete={() => handleDeleteCityButtonClick(index)}
          />
        ))}
      </Box>
      <Box height={'16px'} />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<App />)
