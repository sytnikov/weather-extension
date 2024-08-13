import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
} from '@mui/material'

import {
  OpenWeatherData,
  OpenWeatherTempScale,
  fetchOpenWeatherData,
} from '../../utils/api'
import './WeatherCard.css'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode
  onDelete: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color="secondary" onClick={onDelete}>
              <Typography className="weatherCard-body">Delete</Typography>
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{
  city: string
  tempScale: OpenWeatherTempScale
  onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<WeatherCardState>('loading')

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data)
        setCardState('ready')
      })
      .catch((err) => {
        console.log('👀 ', err)
        setCardState('error')
      })
  }, [city, tempScale])

  if (cardState == 'loading' || cardState == 'error') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{city}</Typography>
        <Typography className="weatherCard-body">
          {cardState == 'loading'
            ? 'Loading...'
            : 'Error: could not retrieve data for this city'}
        </Typography>
      </WeatherCardContainer>
    )
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography className="weatherCard-title">{weatherData.name}</Typography>
      <Typography className="weatherCard-body">
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography className="weatherCard-body">
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard
