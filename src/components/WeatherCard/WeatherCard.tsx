import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Grid,
} from '@mui/material'
import { CloseRounded } from '@mui/icons-material';

import {
  OpenWeatherData,
  OpenWeatherTempScale,
  fetchOpenWeatherData,
  getWeatherIconSrc,
} from '../../utils/api'
import './WeatherCard.css'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode
  onDelete: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box my={'16px'}>
      <Card style={{position: "relative"}}>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button className='weatherCard-delete' color="secondary" onClick={onDelete}>
              <CloseRounded />
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
      <Grid container justifyContent={"center"} alignItems={"center"} gap={"14px"}>
        <Grid item xs={6}>
          <Typography className="weatherCard-title">
            {weatherData.name}
          </Typography>
          <Typography className="weatherCard-temp">
            {`${Math.round(weatherData.main.temp)}\u00B0`}
          </Typography>
          <Typography className="weatherCard-body">
            {`Feels like: ${Math.round(weatherData.main.feels_like)}\u00B0`}
          </Typography>
        </Grid>
        <Grid item xs={4} display={'flex'} flexDirection={'column'} justifyContent={"center"} alignItems={"center"}>
          {weatherData.weather.length > 0 && (
            <>
              <img src={getWeatherIconSrc(weatherData.weather[0].icon)} className='weatherCard-icon' />
              <Typography className="weatherCard-body">{weatherData.weather[0].main}</Typography>
              <Typography className="weatherCard-description">{`(${weatherData.weather[0].description})`}</Typography>
            </>
          )}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  )
}

export default WeatherCard
