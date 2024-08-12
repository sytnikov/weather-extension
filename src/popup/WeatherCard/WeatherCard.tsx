import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { OpenWeatherData, fetchOpenWeatherData } from '../../utils/api'
import { Button, CardActions } from '@mui/material'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode,
  onDelete: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color="secondary" onClick={onDelete}>Delete</Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{
  city: string,
  onDelete: () => void
}> = ({ city, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<WeatherCardState>('loading')

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data)
        setCardState('ready')
      })
      .catch((err) => {
        console.log('👀 ', err)
        setCardState('error')
      })
  }, [city])

  if (cardState == 'loading' || cardState == 'error') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          {cardState == 'loading'
            ? 'Loading...'
            : 'Error: could not retrieve data for this city'}
        </Typography>
      </WeatherCardContainer>
    )
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant="h5">{weatherData.name}</Typography>
      <Typography variant="body1">
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard
