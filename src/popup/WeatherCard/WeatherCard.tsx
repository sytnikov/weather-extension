import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { OpenWeatherData, fetchOpenWeatherData } from '../../utils/api'

const WeatherCard: React.FC<{
  city: string
}> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data)
      })
      .catch((err) => console.log('👀 error: ', err))
  }, [city])

  if (!weatherData) {
    return <div>Loading...</div>
  }

  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>
          <Typography variant="h5">{weatherData.name}</Typography>
          <Typography variant="body1">
            {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography variant="body1">
            Feels like: {Math.round(weatherData.main.feels_like)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default WeatherCard
