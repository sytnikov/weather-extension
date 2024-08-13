import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import { Grid, Box, Paper, InputBase, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import 'fontsource-roboto'
import './popup.css'
import WeatherCard from './WeatherCard'
import {
  LocalStorageOptions,
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from '../utils/storage'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>('')
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
    getStoredOptions().then((options) => setOptions(options))
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

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    }
    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions)
    })
  }

  // make sure the rendering process starts after options are loaded
  if (!options) {
    return null
  }

  return (
    <div>
      <Box mx={'8px'} my={'16px'}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
          gap={'4px'}
        >
          <Grid item xs={9}>
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
          <Grid item xs={2} height={'100%'}>
            <Paper>
              <Box
                py={'3px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <IconButton onClick={handleTempScaleButtonClick}>
                  {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {
          options.homeCity != "" && (
            <WeatherCard city={options.homeCity} tempScale={options.tempScale}/>
          )
        }
        {cities.map((city, index) => (
          <WeatherCard
            city={city}
            tempScale={options.tempScale}
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
